import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup' // Yup import 
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { setisPassword } from '../redux/productSlice'
import { FileParse } from '../services/FileParse';

function RegisterPage() {
const isPassword = useSelector((state) => state.product.isPassword)
const dispatch = useDispatch()

const ValidType = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']
// ovde smo samo napsiali custom za img koji type podatka je validan uopste za sliku...
let KB = 1024; // KB ima 1024 bita
let MB = KB * 1024; // kazemo da MB ima KB * 1024 
// slika se uvek racuna u bitovima

// prvo pravimo contantu za samo useFormik funkciju
  const formik = useFormik({ // u objekat uvek stavjamo initialValues{}
    initialValues: { // sadrzi key za svaki input (sto je u inputu = name), takodje value od svakog inputa ce uvek biti string, zato stavljamo prazan string
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      Birthday: '',
      gender: '',
      image: '',
    },

    onSubmit: (values) => { // ovde smo za Submit dodali values kao argument 
      console.log(values) // da bi mogli da vidimo u konzoli vrednosti 
      FileParse(values.image)  // pozivamo nas Parse ovde jer se slika ucitava tek posle ovog submit
        .then((res) => console.log(res)) // psoto znamo da je FileParse Promise imamo (then, catch)
        // vratice nam u konzoli tacno ceo URL od slike koji je kao string
        .catch((err) => console.log(err))
      formik.handleReset() // i stavimo isto formik funkciju za reset koja se aktivira nakon submita
    },

    validationSchema: Yup.object({ // ovo je standard za validaciju sa Yup funkcijom za to
    firstName: Yup.string().required('You must insert your name'),
    // sa ovim smo rekli da firstName bude string i da required(mora da se unese, ako ne onda izbaci poruku)
    lastName: Yup.string().required('You must insert your LastName'),
    password: Yup.string()
    .required('Please Enter your password')
    .matches(
      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ), // ovo je za pass kopirano sa regex Yup
    email: Yup.string()
      .email()
      .required('Enter your E-mail')
    }),
    image: mixed().required('You must insert image') // mixed znaci da cemo imati vise nekih zahteva za upload slike
      .test('fileSize', 'Wrong file size to 2MB', (value) => value.size < MB * 2)
      //.test - zahtev / ovde smo rekli za fileSize napisi ovu poruku, ako je value veci od MB * 2 
      // value je ovde tacno vrednost iz image: "" 
      .test('fileType', 'Wrong File type', (value) => ValidType.includes(value.type))
      // ako value.type od value(sam image) spada u ValidType array odzgo, onda prikazi sliku
      // value.type  -  za proveru typa slike
      // value.size  -  za proveru velicine
      // oba smo prvo definisali gore pa onda poredimo sa tim na ovaj nacin
  })


  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]; 
  // ovo je za prikaz ono required() iz Yup - znaci da ako zapravo postoji takva greska onda prikazi error  -  a name je ovde key od svakog inputa, znaci da name vazi za svaki input
  // showError prikazujemo obicno u label pod span tagom za svaki input pojedinacno 

  function ChangePass () { // promena state za ikonicu na passwordu
    dispatch(setisPassword(true))
  }


  return (
    <div className='h-[100%] mt-[100px]'>
      <form onSubmit={formik.handleSubmit} // sama formik funkcija sa Submit cele forme i uvek se stavlja na formu
      className='p-[20px] border border-black-300 rounded-[5px] shadow-2xl w-[100%] flex gap-[10px] md:w-[40%] mx-auto flex-col justify-center'>
        <div className='flex flex-col gap-[6px]'>
          <label>FirstName <span className='ml-[10px] text-[12px] text-red-500 font-semibold'>{showError('firstName')}</span></label>
          <input className='p-[12px] outline-none border border-orange-400 rounded-[5px]'
          type='text' 
          name='firstName' 
          placeholder='Enter your name'
          id='FirstName'
          value={formik.values.firstName}
          onChange={formik.handleChange}></input> 
        </div>
        <div className='flex flex-col'>
          <label>LastName <span className='ml-[10px] text-[12px] text-red-500 font-semibold'>{showError('lastName')}</span></label>
          <input className='p-[12px] outline-none border border-orange-400 rounded-[5px]'
          type='text' 
          name='lastName' 
          placeholder='Enter your last name'
          id='LastName'
          value={formik.values.lastName}
          onChange={formik.handleChange}></input>
        </div>
        <div className='flex flex-col'>
          <label>Email <span className='ml-[10px] text-[12px] text-red-500 font-semibold'>{showError('email')}</span></label>
          <input className='p-[12px] outline-none border border-orange-400 rounded-[5px]'
          type='text' 
          name='email' 
          placeholder='Enter your E-mail'
          id='email'
          value={formik.values.email}
          onChange={formik.handleChange}></input>
        </div>
        <div className='flex flex-col'>
          <label>Password <span className='ml-[10px] text-[12px] text-red-500 font-semibold'>{showError('password')}</span></label>
          <div className='flex justify-between pr-[12px] w-[100%] items-center outline-none border border-orange-400 rounded-[5px]'>
            <input className='p-[12px] '
            type={!isPassword ? 'text' : 'password'} // menjanje type na promenu state 
            name='password' 
            placeholder='Enter your password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange} > 
            </input> 
            <div onClick={ChangePass}> 
              {isPassword ? <FaEye />: <FaEyeLowVision />}   
            </div>            
          </div>
        </div>
        <div className='flex flex-col'>
          <label>Birthday</label>
          <input className='p-[12px] outline-none border border-orange-400 rounded-[5px]'
          type='date' 
          name='Birthday' 
          placeholder='Enter your date'
          id='Birthday'
          value={formik.values.Birthday}
          onChange={formik.handleChange}></input>
        </div>
        <div className='flex flex-col'>
          <label>Gender</label>
          <select className='p-[12px] outline-none border border-orange-400 rounded-[5px]'  
          onChange={formik.handleChange}        
          name='gender' 
          id='gender'
          value={formik.values.gender}>
            <option value="" defaultChecked disabled>Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label>Image</label>
          <input className='p-[12px] outline-none border border-orange-400 rounded-[5px]'
          type='file' 
          name='iamge' 
          id='image'
          value={formik.values.image}
          onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])}></input>
        </div>
        <button className='w-[100%] py-[16px] bg-orange-400 rounded-[5px]' 
        type='submit'>Register</button>
      </form>
    </div>
  ) 
}

// value={formik.values.FirstName/password/image...}
// uvek sa formikom pristupamo u sam useFormik i uzimamo key(name) za odredjeni input 

// onChange={formik.handleChange} - u svakom inputu formik funkcija za sacuva vrednost iz inputa 
// onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])} - za sliku je uvek drugacije 
// ovde je nova arrow funkcija sa (e) uzimamo vrednost slike kao string
// formik.setFieldValue je formik funkcija za hendlovanje fajlova 
// za 1. argument prihvata kao i sve ostale iz useFormik key 
// za 2.  argument samu sliku kao file na 0 indexnoj poziji, odnosno ta prva slika 
export default RegisterPage