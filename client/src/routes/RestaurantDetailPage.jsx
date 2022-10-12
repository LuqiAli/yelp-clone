import React from 'react'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReviews from '../components/AddReviews'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantDetailPage = () => {

  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)
  const [restaurant, setRestaurant] = useState(null)
  // const [reviews, setReviews] = useState
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response)
        setSelectedRestaurant(response.data.data)
        setRestaurant(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData() 
  }, [])

  const updateReviews = (updatedReviews) => {
    setRestaurant({...restaurant, reviews: updatedReviews})
  }
  
  console.log(restaurant)
  
  if (!restaurant) return null
  return (
    <div>
        <>
        <h1 className='font-weight-light display-1 text-center'>{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
          <span className="text-warning">
            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
          </span>
        </div>
          <div className="mt-3">
            <Reviews reviews={restaurant.reviews}/>
          </div>
          <AddReviews reviews={restaurant.reviews} updateReviews={updateReviews}/>
      </>
    </div>
  )
}

export default RestaurantDetailPage
