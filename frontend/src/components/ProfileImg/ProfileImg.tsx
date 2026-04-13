import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useUser } from '../../Context/UserContext.tsx';
import defaultUserImage from '../../assets/icons/userImage.png'

export default function ProfileImageManager() {
  const { user, updateProfilePic, removeProfilePic } = useUser();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateProfilePic(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };


  const toolsIconRef = useRef<HTMLDivElement | null>(null);
  const imageToolsRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleIconClick = (e: MouseEvent) => {
      e.stopPropagation();
      setVisible((prev) => !prev);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      if (
        imageToolsRef.current &&
        e.target instanceof Node &&
        !imageToolsRef.current.contains(e.target)
      ) {
        setVisible(false);
      }
    };

    const icon = toolsIconRef.current;
    if (icon) icon.addEventListener('click', handleIconClick);
    document.addEventListener('click', handleDocumentClick);

    return () => {
      if (icon) icon.removeEventListener('click', handleIconClick);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const profileSrc = user?.profilePic || defaultUserImage;

  return (
    <section className="profileContainer">

        <div className="profile">
            <div className="userImage">
                <img src={profileSrc} alt="Foto de perfil" />
            </div>
            <div id="toolsicon" ref={toolsIconRef}>
                <span id="icon">...</span>
            </div>
        </div>
        <div id="imageTools" ref={imageToolsRef} style={{ display: visible ? 'flex' : 'none', opacity: visible ? 1 : 0 }}>
            <label htmlFor="filePicker" className='userBtn'>Cambiar imagen</label>
            <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            id="filePicker"
            />
            {user?.profilePic && (
            <button onClick={removeProfilePic} className="userBtn">
                Eliminar imagen
            </button>
            )
            }
        </div>
    </section>
  );
}
