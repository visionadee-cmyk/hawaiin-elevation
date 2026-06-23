import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function BidComparison() {
  const [bids, setBids] = useState([]);
  const [competitorSubmissions, setCompetitorSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBid, setSelectedBid] = useState(null);
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);

  useEffect(() => {
    // Fetch bids
    const bidsQuery = query(collection(db, 'bids'));
    const unsubscribeBids = onSnapshot(bidsQuery, (snapshot) => {
      const fetchedBids = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBids(fetchedBids);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching bids:', error);
      setLoading(false);
    });

    // Fetch competitor submissions
    const submissionsQuery = query(collection(db, 'competitorSubmissions'));
    const unsubscribeSubmissions = onSnapshot(submissionsQuery, (snapshot) => {
      const fetchedSubmissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCompetitorSubmissions(fetchedSubmissions);
    }, (error) => {
      console.error('Error fetching competitor submissions:', error);
    });

    return () => {
      unsubscribeBids();
      unsubscribeSubmissions();
    };
  }, []);

  const toggleCompetitorSelection = (id) => {
    setSelectedCompetitors(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getCompetitorsForBid = (bidId) => {
    return competitorSubmissions.filter(cs => cs.bidId === bidId);
  };

  const selectedBidCompetitors = selectedBid ? getCompetitorsForBid(selectedBid.id) : [];
  const selectedCompetitorData = selectedBidCompetitors.filter(c => selectedCompetitors.includes(c.id));
  const lowestPrice = selectedBidCompetitors.length > 0 ? Math.min(...selectedBidCompetitors.map(c => c.value || 0)) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bid Comparison Tool</h1>
          <p className="text-gray-500 mt-1">Compare competitor submissions for your bids</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading bids...</p>
        </div>
      ) : (
        <>
          {/* Bid Selection */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Select a Bid to Compare</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bids.map((bid) => (
                <div
                  key={bid.id}
                  onClick={() => setSelectedBid(bid)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedBid?.id === bid.id ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{bid.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">Tender ID: {bid.tenderId}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Deadline: {bid.submissionDeadline}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {getCompetitorsForBid(bid.id).length} competitor{getCompetitorsForBid(bid.id).length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Comparison Table */}
          {selectedBid && (
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">
                Competitor Submissions for: {selectedBid.title}
              </h3>

              {selectedBidCompetitors.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No competitor submissions recorded for this bid yet.
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2">
                          <th className="px-4 py-3 text-left">Compare</th>
                          <th className="px-4 py-3 text-left">Competitor</th>
                          <th className="px-4 py-3 text-right">Bid Value</th>
                          <th className="px-4 py-3 text-center">Duration</th>
                          <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBidCompetitors.map((submission) => (
                          <tr key={submission.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={selectedCompetitors.includes(submission.id)}
                                onChange={() => toggleCompetitorSelection(submission.id)}
                                className="w-4 h-4"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-medium">{submission.competitorName}</span>
                              {submission.value === lowestPrice && lowestPrice > 0 && (
                                <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                                  Lowest Price
                                </span>
                              )}
                            </td>
                            <td className={`px-4 py-3 text-right font-medium ${submission.value === lowestPrice && lowestPrice > 0 ? 'text-emerald-600' : ''}`}>
                              MVR {submission.value?.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-center">{submission.duration}</td>
                            <td className="px-4 py-3 text-center">
                              <button className="text-blue-600 hover:underline text-sm">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Side-by-Side Comparison */}
                  {selectedCompetitorData.length >= 2 && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-semibold text-lg mb-4">
                        Side-by-Side Comparison ({selectedCompetitorData.length} selected)
                      </h3>
                      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedCompetitorData.length}, minmax(200px, 1fr))` }}>
                        {selectedCompetitorData.map((submission) => (
                          <div key={submission.id} className="border rounded-lg p-4">
                            <h4 className="font-semibold text-center mb-4 pb-4 border-b">{submission.competitorName}</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Value:</span>
                                <span className={`font-medium ${submission.value === lowestPrice && lowestPrice > 0 ? 'text-emerald-600' : ''}`}>
                                  MVR {submission.value?.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span>{submission.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bid Title:</span>
                                <span className="text-right text-xs">{submission.title?.substring(0, 20)}...</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
