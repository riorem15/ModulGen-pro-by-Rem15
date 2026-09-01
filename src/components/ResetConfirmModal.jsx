import React from 'react';
import { AlertTriangle, RotateCcw, X, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import './ResetConfirmModal.css';

const ResetConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay reset-modal-overlay">
      <div className="modal-content reset-modal-card animate-scale-up">
        {/* Header */}
        <div className="reset-modal-header">
          <div className="reset-icon-badge">
            <RotateCcw size={22} color="#DC2626" />
          </div>
          <button 
            type="button" 
            className="btn btn-icon reset-close-btn" 
            onClick={onClose}
            title="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="reset-modal-body">
          <h3 className="reset-modal-title">Buat Modul Baru / Reset Formulir?</h3>
          <p className="reset-modal-desc">
            Tindakan ini akan mengosongkan <strong>seluruh data isian formulir</strong> yang sedang Anda buat saat ini agar Anda dapat memulai penyusunan modul ajar baru dari awal.
          </p>

          <div className="reset-warning-box">
            <div className="reset-warning-icon">
              <AlertTriangle size={18} color="#D97706" />
            </div>
            <div className="reset-warning-text">
              <strong>Perhatian:</strong> Pastikan Anda telah mengunduh (Ekspor Word / PDF) modul Anda sebelumnya jika masih dibutuhkan, karena data lama yang belum diekspor akan dihapus dari penyimpanan formulir.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="reset-modal-actions">
          <button 
            type="button" 
            className="btn btn-secondary reset-btn-cancel" 
            onClick={onClose}
          >
            Batal
          </button>
          <button 
            type="button" 
            className="btn reset-btn-confirm" 
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            <span>Ya, Bersihkan & Buat Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
