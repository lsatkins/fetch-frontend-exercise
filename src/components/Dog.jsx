import React, {useState, useEffect} from 'react'
import '../styles/searchForm.css'
import {AiFillHeart} from 'react-icons/ai'
import {AiOutlineHeart} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import { toggleSaved } from '../redux/dogs/dogsSlice';

const Dog = ({ dogObj, index }) => {
    const saved = useSelector((state) => state.dogs.saved);

    const dispatch = useDispatch();

    const [savedDog, setSavedDog] = useState(false)

    const displaySaved = () => {
        const foundDog = saved.find((dog) => dog.id === dogObj.id);
        setSavedDog(foundDog);
    }
  const changeSaved = () => {
    dispatch(toggleSaved(dogObj.id));
  };

  useEffect(() => {
    displaySaved()
  }, [saved])
  

  return (
    <>
      <li key={dogObj.id} className={`p-3 w-100 ${index % 2 === 0 ? 'orange' : 'purple'}`}>
        <div className="row">
            <div className="col-6 d-flex justify-content-end">
                <img className="shadow-lg border border-dark rounded-2" src={dogObj.img} height="500px" width="500px" alt="Dog" />
            </div>          
          <div className="col-6 d-flex flex-column justify-content-center align-items-center">
            <div className="text p-4 bg-white shadow-lg border border-dark rounded-2">
                <div>Name: {dogObj.name}</div>
                <div>Age: {dogObj.age}</div>
                <div>Breed: {dogObj.breed}</div>
                <div>Zip Code: {dogObj.zip_code}</div>
                <div className="text-center" onClick={changeSaved}>
                {savedDog ? <AiFillHeart /> : <AiOutlineHeart />}
                </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Dog;
