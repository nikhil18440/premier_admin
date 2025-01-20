'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './mainPage.css'
import axios from 'axios'

export default function MainPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState([]);
  const [imageCloud, setImageCloud] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [user,setUser] = useState(null)

  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem('user'))
    setUser(localUser)
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title:title,
      description:description,
      price:price,
      discount:discount,
      categories: categories.split(',').map((category) => category.trim()),
      images: imageCloud.split(',').map((imageCloud) => imageCloud.trim()),
    };

    console.log(productData);

    // You can now send the productData to your server using fetch or axios
  
    if(user){
      console.log(user)
      try {
      
          const newProd = await axios.post(`${process.env.API_ENDPOINT}/product/${user._id}`, 
            productData
          , {headers: {
            token: `Bearer ${user.accessToken}`
        }})
          
          console.log(newProd.data)
      } catch (error) {
        console.log(error)
      }
    }
  };

  // const handleImageChange = (e) => {
  //   setImages(e.target.files);
  //   const urls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
  //   setImageUrls(urls);


  // };

  

  return (
    <div>
      <div className="top">
        <Link href={'/lists'}>Lists</Link>
      </div>

      <div className="bottom">
        <form onSubmit={handleSubmit}>
          <h2>Product Details</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount Price:</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories:</label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Enter categories separated by comma"
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              required
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="imagesLink">ImagesLink:</label>
            <input
              type="text"
              id="imagesLink"
              name="imagesLink"
              multiple
              onChange={(e) => setImageCloud(e.target.value)}
              required
            />
          </div>
          {/* {imageUrls.length > 0 && (
            <div className="image-preview">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index + 1}`} />
              ))}
            </div>
          )} */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}