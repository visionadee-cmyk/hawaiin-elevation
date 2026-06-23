import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Building2, DollarSign, Clock, Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CompetitorSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bidId: '',
    competitorName: '',
    value: '',
    duration: ''
  });

  useEffect(() => {
    const submissionsQuery = query(collection(db, 'competitorSubmissions'));
    
    const unsubscribe = onSnapshot(submissionsQuery, (snapshot) => {
      const fetchedSubmissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(fetchedSubmissions);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching competitor submissions:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingSubmission) {
        await updateDoc(doc(db, 'competitorSubmissions', editingSubmission.id), {
          competitorName: formData.competitorName,
          value: parseFloat(formData.value),
          duration: formData.duration
        });
        setEditingSubmission(null);
      } else {
        await addDoc(collection(db, 'competitorSubmissions'), {
          bidId: formData.bidId,
          title: selectedBid?.title,
          tenderId: selectedBid?.tenderId,
          submissionDeadline: selectedBid?.submissionDeadline,
          submissionTime: selectedBid?.submissionTime,
          competitorName: formData.competitorName,
          value: parseFloat(formData.value),
          duration: formData.duration,
          createdAt: new Date().toISOString()
        });
      }
      
      setFormData({ bidId: '', competitorName: '', value: '', duration: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving submission:', error);
    }
  };

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
    setFormData({
      bidId: submission.bidId,
      competitorName: submission.competitorName,
      value: submission.value,
      duration: submission.duration
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteDoc(doc(db, 'competitorSubmissions', id));
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    }
  };

  const toggleExpand = (bidId) => {
    setExpandedBidId(expandedBidId === bidId ? null : bidId);
  };

  const groupedSubmissions = submissions.reduce((acc, submission) => {
    if (!acc[submission.bidId]) {
      acc[submission.bidId] = {
        bidId: submission.bidId,
        title: submission.title,
        tenderId: submission.tenderId,
        submissionDeadline: submission.submissionDeadline,
        submissionTime: submission.submissionTime,
        competitors: []
      };
    }
    acc[submission.bidId].competitors.push(submission);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/bids')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Competitor Submissions</h1>
            <p className="text-gray-500 mt-1">Track competitor bid submissions and values</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Submission
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">
            {editingSubmission ? 'Edit Submission' : 'Add Competitor Submission'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Competitor Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.competitorName}
                  onChange={(e) => setFormData({ ...formData, competitorName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value (MVR)
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bid value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 6 months, 1 year"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">
                {editingSubmission ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingSubmission(null);
                  setFormData({ bidId: '', competitorName: '', value: '', duration: '' });
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading submissions...</p>
        </div>
      ) : Object.keys(groupedSubmissions).length === 0 ? (
        <div className="card text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No competitor submissions recorded yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.values(groupedSubmissions).map((group) => (
            <div key={group.bidId} className="card overflow-hidden">
              {/* Bid Header - Always Visible */}
              <div
                onClick={() => toggleExpand(group.bidId)}
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{group.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        Tender ID: {group.tenderId}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Deadline: {group.submissionDeadline}
                      </span>
                      {group.submissionTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Time: {group.submissionTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {group.competitors.length} {group.competitors.length === 1 ? 'competitor' : 'competitors'}
                    </span>
                    {expandedBidId === group.bidId ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Competitors List - Expandable */}
              {expandedBidId === group.bidId && (
                <div className="border-t bg-gray-50 p-4">
                  <div className="space-y-3">
                    {group.competitors.map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{submission.competitorName}</p>
                          <div className="flex gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              MVR {submission.value?.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-blue-600" />
                              {submission.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(submission)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(submission.id)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
