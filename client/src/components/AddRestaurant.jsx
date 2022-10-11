import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
        console.log("hi")
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            console.log("S") 
            addRestaurants(response.data.data.restaurants)
        } catch (err) {
            console.log(err)
        }
    }
    
  return (
    <div className='mb-4'>
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input type="text" className='form-control' placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="col">
                    <input type="text" className='form-control' placeholder='Location'  value={location} onChange={e => setLocation(e.target.value)}/>
                </div>
                <div className="col">
                    <select className='custom-select my-1 mr-sm-2' value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type='submit' className="btn btn-primary">Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant