import React ,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom'

// const NavBarInner=({children})=> {

//   const location = useLocation();

//   const [showNavigationBar,setShowNavBar] = useState(false);
   
//   useEffect(()=>{

//     console.log("this is current location",location);
//     if(location.pathname==="healer-dashboard-page"){
//           setShowNavBar(false)
//     }
//     else{
//         setShowNavBar(true)
//     }
//   },[location])

//   return (
//    <>
//    {/* <nav>
//     <ul>
//         <li>
//             <Link to="/">LogOut</Link>
//         </li>
//     </ul>
//    </nav> */}
//    {showNavBar && children}
//    </>
//   )

// }

function NavBarInner(){
    return(
    <div>
        <nav className='innernavbar'>
            <ul>
                <li>
                    <Link to="/">LogOut</Link>
                </li>
            </ul>
        </nav>
    </div>
    )
}

export default NavBarInner