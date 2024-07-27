import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


const Filterdata = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [page, setPage] = useState(1);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const sliderRef = useRef(null);

  const dateOptions = [
    { name: '1/20/1970', value: '1/20/1970' },
    { name: '1/21/1970', value: '1/21/1970' },
  ];

  const typeOptions = [
    { name: 'Yoga', value: 'Yoga' },
    { name: 'Meditation', value: 'Meditation' },
    { name: 'Detox', value: 'Detox' },
    { name: 'Mental Wellness', value: 'Mental Wellness' },
  ];

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=20`);
        setRetreats(response.data);
      } catch (error) {
        console.error('Error fetching the retreats:', error);
      }
    };

    fetchRetreats();
  }, [page]);

  useEffect(() => {
    const fetchFilteredRetreats = async () => {
      let url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=20`;

      if (selectedType) {
        url += `&filter=${selectedType}`;
      }

      try {
        const response = await axios.get(url);
        setRetreats(response.data);
      } catch (error) {
        console.error('Error fetching filtered retreats:', error);
      }
    };

    fetchFilteredRetreats();
  }, [selectedType, page]);

  useEffect(() => {
    let filtered = retreats;

    if (selectedDate) {
      filtered = filtered.filter(retreat => new Date(retreat.date).toLocaleDateString() === selectedDate);
    }

    // if (selectedType) {
    //   filtered = filtered.filter(retreat => retreat.type === selectedType);
    // }

    if (searchTerm) {
      filtered = filtered.filter(retreat => retreat.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredRetreats(filtered);
  }, [selectedDate, searchTerm, retreats]);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          rows: 2,
          // vertical: true,
          // verticalSwiping: true,
        }
      }
    ]
  };

  return (
    <div className="min-h-auto px-1 py-4">
     <div className="flex flex-wrap justify-between items-center w-full mt-4">
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto">
    <div className="relative w-full md:w-56">
      <div className="relative z-30">
        <button
          onClick={() => setShowDateDropdown(!showDateDropdown)}
          className="w-full bg-gray-200 text-black lg:bg-blue-950 lg:text-white rounded-lg border-none flex justify-between items-center p-2">
          {selectedDate ? selectedDate : 'Filter by Date'}
          {showDateDropdown ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showDateDropdown && (
          <div className="absolute w-full bg-white text-black rounded-lg mt-1 shadow-lg z-40"> 
            {dateOptions.map(option => (
              <div
                key={option.value}
                onClick={() => {
                  setSelectedDate(option.value);
                  setShowDateDropdown(false);
                }}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {option.name}
              </div>
            ))}
            <div
              onClick={() => {
                setSelectedDate(null);
                setShowDateDropdown(false);
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              Clear
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="relative w-full md:w-56">
      <div className="relative z-20"> 
        <button
          onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          className="w-full bg-gray-200 text-black lg:bg-blue-950 lg:text-white rounded-lg border-none flex justify-between items-center p-2">
          {selectedType ? selectedType : 'Filter by Type'}
          {showTypeDropdown ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showTypeDropdown && (
          <div className="absolute w-full bg-white text-black rounded-lg mt-1 shadow-lg z-30"> 
            {typeOptions.map(option => (
              <div
                key={option.value}
                onClick={() => {
                  setSelectedType(option.value);
                  setShowTypeDropdown(false);
                }}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {option.name}
              </div>
            ))}
            <div
              onClick={() => {
                setSelectedType(null);
                setShowTypeDropdown(false);
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              Clear
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
        <div className="relative w-full md:w-96 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search retreats by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:bg-blue-950 bg-gray-200 sm:bg-blue-950 rounded-lg p-2 text-black sm:text-black lg:text-white lg:placeholder-white sm:placeholder-white"
          />
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {filteredRetreats.map(retreat => (
          <div key={retreat.id} className="p-4">
            <div className="bg-gray-200 rounded-lg lg:w-[30vw] lg:h-[22vw] overflow-hidden shadow-lg">
              <div className='flex mt-[1vw] ml-[1vw]'>
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="w-full flex h-24 object-cover lg:w-64 lg:h-40 lg:rounded-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold md:text-[1vw] mb-1">{retreat.title}</h3>
                <p className="text-gray-700 md:text-[0.9vw] mb-1">{retreat.description}</p>
                <p className="text-gray-700 md:text-[0.9vw]"><strong>Date:</strong> {new Date(retreat.date).toLocaleDateString()}</p>
                <p className="text-gray-700 md:text-[0.9vw]"><strong>Location:</strong> {retreat.location}</p>
                <p className="text-gray-700 md:text-[0.9vw]"><strong>Price:</strong> ${retreat.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: "center" }}>
        <button
          className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg mx-2"
          onClick={previous}
        >
          Previous
        </button>
        <button
          className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg mx-2"
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Filterdata;
