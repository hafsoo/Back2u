import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropDown = ({ categoriesData, setDropDown }) => {  
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/items?category=${i.title}`);
    setDropDown(false);
    //window.location.reload();  //👉 Reload the current webpage
  };

  return (
    <div className='pb-4 w-[270px] bg-[#fff] rounded z-30 rounded-b-md shadow-sm max-h-[400px]  overflow-y-auto'>
      {
        categoriesData && categoriesData.map((i, index) => (
          <div
            key={index}
            className='flex items-center'
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'contain',
                marginLeft: '10px',
                userSelect: 'none'
              }}
              alt=''
            />
            <h3 className='m-3 cursor-pointer select-none'>{i.title}</h3>
          </div>
        ))
      }
    </div>
  );
};

export default DropDown;
