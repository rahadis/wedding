import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { id } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Sidebar from "../../../components/admin/sidebar";
import { getTransactions } from "../../../_services/transaction";

// Konfigurasi lokal kalender
const locales = { id };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await getTransactions();

        const kalenderEvent = transactionsData
          .filter((item) => item.status === "Paid")
          .map((item) => {

            const start = new Date(
              `${item.event_date}T${item.event_time || "00:00"}`
            );
            const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

            const eventObj = {
              title: item.event_name,
              start,
              end,
              guest: item.guest_count,
              location: item.venue,
            };

            return eventObj;
          });

        setEvents(kalenderEvent);
      } catch (error) {
        console.error("❌ Gagal mengambil data:", error);
        alert("Gagal mengambil data transactions.");
      }
    };

    fetchData();
  }, []);
  
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    const modal = new window.bootstrap.Modal(
      document.getElementById("eventDetailModal")
    );
    modal.show();
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <div className="p-4">
          <h3 className="mb-4 text-primary fw-bold">Kalender Event</h3>

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={["month", "week", "day", "agenda"]}
            view={view}
            onView={(newView) => setView(newView)}
            date={date}
            onNavigate={(newDate) => setDate(newDate)}
            toolbar={true}
            onSelectEvent={handleEventClick}
          />
        </div>
      </div>

      {/* Modal Detail Event */}
      <div
        className="modal fade"
        id="eventDetailModal"
        tabIndex="-1"
        aria-labelledby="eventDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="eventDetailModalLabel">
                Detail Acara
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {selectedEvent && (
              <div className="modal-body">
                <p>
                  <strong>Nama Acara:</strong> {selectedEvent.title}
                </p>
                <p>
                  <strong>Waktu:</strong>{" "}
                  {format(selectedEvent.start, "EEEE, dd MMM yyyy", {
                    locale: id,
                  })}
                </p>
                <p>
                  <strong>Jumlah Tamu:</strong> {selectedEvent.guest}
                </p>
                <p>
                  <strong>Lokasi:</strong> {selectedEvent.location}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
