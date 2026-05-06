import { Link } from "@mui/material";

export default function ErrorPage() {
  return (
    <div className='bg-white bg-opacity-90 flex items-center justify-center h-screen'>
      <div className='text-center text-primary/80'>
        <h1 className='text-[12.5rem] font-bold text-primary'>404</h1>
        <p className='text-inherit mb-4'>The page cannot be found.</p>
        <p className='text-inherit mb-4'>
          Go back to
          <Link href='/' className='text-inherit font-bold ml-2 underline'>
            homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
