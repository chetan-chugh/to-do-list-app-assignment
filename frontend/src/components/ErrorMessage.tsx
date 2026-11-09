export default function ErrorMessage({ message }: { message: string }) {
  return message ? (
    <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200">
      {message}
    </p>
  ) : null;
}