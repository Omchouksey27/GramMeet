import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../context/SocketContext';
import MeetingCard from './MeetingCard';
import MeetingForm from './MeetingForm';
import AttendanceMarker from './AttendanceMarker';
import ConfirmDialog from './ConfirmDialog';
import api from '../../api/axios';

export default function SachivMeetings() {
  const { t, i18n } = useTranslation();
  const { subscribeMeetingUpdates } = useSocket();
  const [tab, setTab] = useState('upcoming');
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [completedMeetings, setCompletedMeetings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      api.get('/meetings?status=upcoming'),
      api.get('/meetings?status=completed'),
    ]).then(([upRes, compRes]) => {
      setUpcomingMeetings(upRes.data);
      setCompletedMeetings(compRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const unsub = subscribeMeetingUpdates(() => load());
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  const handleStatusUpdate = async (id, status) => {
    await api.put(`/meetings/${id}`, { status });
  };

  const handleDelete = async () => {
    await api.delete(`/meetings/${deleteTarget._id}`);
    setDeleteTarget(null);
  };

  const filterList = (list) =>
    list.filter((m) =>
      search
        ? m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.venue.toLowerCase().includes(search.toLowerCase())
        : true
    );

  const currentList = tab === 'upcoming'
    ? filterList(upcomingMeetings)
    : filterList(completedMeetings);

  return (
    <div className="space-y-5">
      {deleteTarget && (
        <ConfirmDialog
          message={`This will permanently remove "${deleteTarget.title}". This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{t('meetings')}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {upcomingMeetings.length} upcoming · {completedMeetings.length} completed
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditMeeting(null); setShowAttendance(false); }}
          className="bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition"
        >
          + {t('schedule_meeting')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { key: 'upcoming', label: 'Upcoming', icon: '📅', count: upcomingMeetings.length },
          { key: 'completed', label: 'Completed', icon: '✅', count: completedMeetings.length },
        ].map(({ key, label, icon, count }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
              tab === key
                ? 'border-green-700 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {icon} {label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              tab === key ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 shadow-sm">
        <span className="text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search by title or venue..."
          className="flex-1 text-sm outline-none bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>

      {/* Schedule / Edit Form */}
      {(showForm || editMeeting) && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-700">
              {editMeeting ? 'Edit Meeting' : t('schedule_meeting')}
            </h3>
            <button
              onClick={() => { setShowForm(false); setEditMeeting(null); }}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >✕</button>
          </div>
          <MeetingForm
            existing={editMeeting}
            onSuccess={() => { setShowForm(false); setEditMeeting(null); }}
          />
        </div>
      )}

      {/* Attendance Panel */}
      {showAttendance && selectedMeeting && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">
                {t('mark_attendance')} — {selectedMeeting.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {new Date(selectedMeeting.date).toLocaleString()} — {selectedMeeting.venue}
              </p>
            </div>
            <button
              onClick={() => { setShowAttendance(false); setSelectedMeeting(null); }}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >✕</button>
          </div>
          <AttendanceMarker meetingId={selectedMeeting._id} />
        </div>
      )}

      {/* Empty state */}
      {!loading && currentList.length === 0 && (
        <div className="text-center py-14 bg-white rounded-xl border">
          <p className="text-5xl mb-3">{tab === 'upcoming' ? '📅' : '✅'}</p>
          <p className="text-gray-500 text-sm">
            {tab === 'upcoming'
              ? 'No upcoming meetings. Click "+ Schedule Meeting" to add one.'
              : 'No completed meetings yet.'}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {currentList.map((m) => (
            <MeetingCard
              key={m._id}
              m={m}
              i18n={i18n}
              t={t}
              onEdit={(m) => {
                setEditMeeting(m);
                setShowForm(false);
                setShowAttendance(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAttendance={(m) => {
                setSelectedMeeting(m);
                setShowAttendance(true);
                setShowForm(false);
                setEditMeeting(null);
              }}
              onStatusUpdate={handleStatusUpdate}
              onDelete={(m) => setDeleteTarget(m)}
            />
          ))}
        </div>
      )}
    </div>
  );
}