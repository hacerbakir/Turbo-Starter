export default function Loading() {
  return (
    <div className='fixed h-screen w-screen top-0 left-0 flex justify-center items-center z-50'>
      <div role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
}
