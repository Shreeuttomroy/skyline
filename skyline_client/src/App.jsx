import { Outlet } from 'react-router-dom';
import Navbar from './Components/SharedComponents/Navbar';
import Footer from './Components/SharedComponents/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}></Toaster>
      <div className=' overflow-x-hidden'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App;