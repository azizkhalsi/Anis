import { useToast } from '../contexts/ToastContext';

export default function Toast() {
  const { message } = useToast();
  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-message">{message}</span>
    </div>
  );
}
