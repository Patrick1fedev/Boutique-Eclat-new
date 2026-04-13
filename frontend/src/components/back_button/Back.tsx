import { useNavigate } from 'react-router-dom'
import '../../styles/back-button.css'

type BackButtonProps =  {
  rute: string;
}

const Back = ({rute}: BackButtonProps) => {
    const navigate = useNavigate();
    const handleBackClick = () =>{
        navigate(`${rute}`, {replace: true});
    }
  return (
    <button title='backbutton' onClick={handleBackClick} id='backbutton'>
      <span className="backline"></span><span className="backline"></span><span className="backline"></span>
    </button>
  )
}

export default Back