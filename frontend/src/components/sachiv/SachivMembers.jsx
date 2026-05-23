import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MemberForm from './MemberForm';
import ConfirmDialog from './ConfirmDialog';
import api from '../../api/axios';

export default function SachivMembers() {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/members')
      .then(({ data }) => setMembers(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    await api.delete(`/members/${deleteTarget._id}`);
    setDeleteTarget(null);
    load();
  };

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.wardArea?.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {deleteTarget && (
        <ConfirmDialog
          message={`This will permanently remove member "${deleteTarget.name}".`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{t('members')}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{members.length} total members</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditMember(null); }}
          className="bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition"
        >
          + {t('add_member')}
        </button>
      </div>

      {(showForm || editMember) && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-700">
              {editMember ? 'Edit Member' : t('add_member')}
            </h3>
            <button
              onClick={() => { setShowForm(false); setEditMember(null); }}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >✕</button>
          </div>
          <MemberForm
            existing={editMember}
            onSuccess={() => { setShowForm(false); setEditMember(null); load(); }}
          />
        </div>
      )}

      <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 shadow-sm">
        <span className="text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search by name, ward, role..."
          className="flex-1 text-sm outline-none bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-4xl mb-3">👥</p>
          <p className="text-gray-500 text-sm">No members found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
              <tr>
                {['Name', 'Email', 'Mobile', 'Role', 'Ward Area', 'Actions'].map((h) => (
                  <th key={h} className="p-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-gray-800">{m.name}</td>
                  <td className="p-3 text-gray-500">{m.email}</td>
                  <td className="p-3 text-gray-500">{m.mobile}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      m.role === 'sarpanch'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {m.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{m.wardArea || '—'}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditMember(m); setShowForm(false); }}
                        className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(m)}
                        className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}