export const DATA = {
    appName: "GreenGuide",

    mockRouteEvents: [
        {
            title: "Aruba Central - 1.9",
            organizer: "James Wilson",
            date: "June 15, 2025",
            participants: 18,
            image: "/placeholder.svg?height=200&width=400",
        },
        {
            title: "Nimble Peak - 3.2",
            organizer: "Michael Gurt",
            date: "July 8-10, 2023",
            participants: 24,
            image: "/placeholder.svg?height=200&width=400",
        },
        {
            title: "Composable Cloud - 6.1",
            organizer: "Matthew Stone",
            date: "June 22, 2023",
            participants: 12,
            image: "/placeholder.svg?height=200&width=400",
        },
    ],

    mockHotels: [
        {
            id: 1,
            name: "Grand Pacific Hotel",
            location: "San Francisco, CA",
            description: "Luxury hotel with stunning views of the Pacific Ocean.",
            price: "$299",
            rating: 4.8,
            reviews: 324,
            image: "/placeholder.svg?height=300&width=500",
            amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym"],
            tags: ["Luxury", "Ocean View", "City Center"],
        },
        {
            id: 2,
            name: "Mountain Retreat Lodge",
            location: "Aspen, CO",
            description: "Cozy mountain lodge perfect for ski enthusiasts.",
            price: "$249",
            rating: 4.6,
            reviews: 256,
            image: "/placeholder.svg?height=300&width=500",
            amenities: ["Free WiFi", "Ski Storage", "Hot Tub", "Restaurant", "Bar"],
            tags: ["Mountain View", "Ski Resort", "Cozy"],
        },
        {
            id: 3,
            name: "Urban Boutique Hotel",
            location: "New York, NY",
            description: "Stylish boutique hotel in the heart of Manhattan.",
            price: "$329",
            rating: 4.7,
            reviews: 412,
            image: "/placeholder.svg?height=300&width=500",
            amenities: ["Free WiFi", "Restaurant", "Bar", "Fitness Center", "Room Service"],
            tags: ["Boutique", "City Center", "Luxury"],
        },
        {
            id: 4,
            name: "Seaside Resort & Spa",
            location: "Miami, FL",
            description: "Beachfront resort with full-service spa and multiple pools.",
            price: "$399",
            rating: 4.9,
            reviews: 528,
            image: "/placeholder.svg?height=300&width=500",
            amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
            tags: ["Beach", "Resort", "Spa"],
        },
        {
            id: 5,
            name: "Historic Downtown Inn",
            location: "Charleston, SC",
            description: "Charming inn located in a historic building with modern amenities.",
            price: "$189",
            rating: 4.5,
            reviews: 187,
            image: "/placeholder.svg?height=300&width=500",
            amenities: ["Free WiFi", "Breakfast", "Garden", "Parking", "Concierge"],
            tags: ["Historic", "Charming", "Central"],
        },
        {
            id: 6,
            name: "Desert Oasis Resort",
            location: "Scottsdale, AZ",
            description: "Luxurious desert resort with golf course and spa treatments.",
            price: "$279",
            rating: 4.7,
            reviews: 342,
            image: "/placeholder.svg?height=300&width=500",
            amenities: ["Free WiFi", "Pool", "Golf Course", "Spa", "Restaurant"],
            tags: ["Desert", "Golf", "Luxury"],
        },
    ],

    popularRoutes: [
        { from: "New ProLiant Village", to: "HPE Innovation Hub", distance: 12 },
        { from: "Simplivity Springs", to: " Ezmeral Valley", distance: 59 },
        { from: "ProLiant Village ", to: " Alletra City", distance: 21 },
    ],

    locations: [
        "ProLiant Village",
        "Simplivity Springs",
        "Alletra City",
        "Aruba Central",
        "Nimble Peak",
        "GreenLake Shores",
        "Ezmeral Valley",
        "Composable Cloud",
        "HPE Innovation Hub",
        "Apollo Heights"
    ],

    mockRoutes: [
        {
            id: 1,
            title: "Aruba Central - 1.9",
            description: "A scenic and thrilling off-road adventure through Aruba's rugged landscapes, offering stunning coastal views and rich historical landmarks.",
            distance: "45 km",
            duration: "3-4 hours",
            difficulty: "Easy",
            rating: 4.7,
            participants: 120,
            image: "/placeholder.svg?height=300&width=500",
            tags: ["Off-Road", "Scenic", "Adventure"],
        },
        {
            id: 2,
            title: "Nimble Peak - 3.2",
            description: "The historic Route 66 from Chicago to Santa Monica.",
            distance: "3,940 km",
            duration: "2-3 weeks",
            difficulty: "Medium",
            rating: 4.7,
            participants: 189,
            image: "/placeholder.svg?height=300&width=500",
            tags: ["Historic", "Road Trip", "Iconic"],
        },
        {
            id: 3,
            title: "Composable Cloud - 6.1",
            description: "A hiking trail that extends from Georgia to Maine.",
            distance: "3,500 km",
            duration: "5-7 months",
            difficulty: "Hard",
            rating: 4.9,
            participants: 127,
            image: "/placeholder.svg?height=300&width=500",
            tags: ["Hiking", "Nature", "Adventure"],
        },
        {
            id: 4,
            title: "Ezmeral Valley - 5.2",
            description: "A scenic drive through the Blue Ridge Mountains.",
            distance: "755 km",
            duration: "3-5 days",
            difficulty: "Easy",
            rating: 4.6,
            participants: 156,
            image: "/placeholder.svg?height=300&width=500",
            tags: ["Scenic", "Mountains", "Road Trip"],
        },
        {
            id: 5,
            title: "Alletra City - 6.5",
            description: "A coastal drive in Victoria, Australia.",
            distance: "243 km",
            duration: "1-2 days",
            difficulty: "Easy",
            rating: 4.8,
            participants: 201,
            image: "/placeholder.svg?height=300&width=500",
            tags: ["Coastal", "Scenic", "International"],
        },
        {
            id: 6,
            title: "HPE Innovation Hub - 0.4",
            description: "A hiking trail to Machu Picchu in Peru.",
            distance: "43 km",
            duration: "4 days",
            difficulty: "Hard",
            rating: 4.9,
            participants: 98,
            image: "/placeholder.svg?height=300&width=500",
            tags: ["Hiking", "Historic", "International"],
        },
    ],

    mockRouteDetails: {
        id: 1,
        title: "Aruba Central - 1.9",
        description: "A scenic and thrilling off-road adventure through Aruba's rugged landscapes, offering stunning coastal views and rich historical landmarks.",
        longDescription: `
            The Aruba Central - 1.9 route is a must-experience trail for adventure seekers. This off-road journey takes you through the heart of Aruba’s diverse terrain, featuring rocky hills, desert-like landscapes, and breathtaking oceanfront cliffs.
    
            The trail begins near Oranjestad, leading riders through the beautiful Arikok National Park, where they can witness natural wonders such as the Fontein Cave and the Natural Pool. Along the way, you will encounter historical ruins, including the Bushiribana Gold Mill Ruins, a remnant of Aruba’s gold mining past.
    
            Whether you're an experienced rider or a casual traveler, this route offers a mix of easy and challenging paths, making it suitable for all levels. Enjoy the tropical breeze as you navigate sandy trails and rugged terrain, culminating at the island’s northern tip near the California Lighthouse, where panoramic views of the Caribbean Sea await.
        `,
        distance: "45 km",
        duration: "3-4 hours",
        difficulty: "Moderate",
        rating: 4.7,
        reviews: 120,
        participants: 300,
        image: "/placeholder.svg?height=500&width=1000",
        creator: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=50&width=50",
        },
        tags: ["Off-Road", "Scenic", "Adventure"],
    },

    mockHotelDetails: [
        {
            id: 1,
            name: "Alletra Diamond Grand Hotel",
            location: "Green Lake",
            description: "Luxury hotel with stunning views of the lake.",
            price: "$299",
            rating: 4.8,
            reviews: 324,
            image: "/placeholder.svg?height=300&width=500",
            rooms: 120,
            occupancy: "78%",
            revenue: "$45,890",
        },
        {
            id: 2,
            name: "Alletra Haven",
            location: "Green Lake",
            description: "Cozy mountain lodge perfect for ski enthusiasts.",
            price: "$249",
            rating: 4.6,
            reviews: 256,
            image: "/placeholder.svg?height=300&width=500",
            rooms: 85,
            occupancy: "65%",
            revenue: "$32,450",
        },
    ],

    mockBookings: [
        {
            id: 1,
            guest: "John Smith",
            hotel: "Alletra Diamond Grand Hotel",
            checkIn: "2023-06-15",
            checkOut: "2023-06-20",
            guests: 2,
            status: "Confirmed",
            total: "$1,495",
        },
        {
            id: 2,
            guest: "Sarah Johnson",
            hotel: "Alletra Haven",
            checkIn: "2023-06-22",
            checkOut: "2023-06-25",
            guests: 3,
            status: "Pending",
            total: "$897",
        },
        {
            id: 3,
            guest: "Michael Brown",
            hotel: "Alletra Haven",
            checkIn: "2023-07-01",
            checkOut: "2023-07-07",
            guests: 4,
            status: "Confirmed",
            total: "$1,743",
        },
    ],

    mockHotelDetailPage: {
        id: 1,
        name: "Alletra Diamond Grand Hotel",
        location: "Green Lake",
        description: "Luxury hotel with stunning views of the lake.",
        price: "$299",
        rating: 4.8,
        reviews: 324,
        image: "/placeholder.svg?height=300&width=500",
        rooms: 120,
        occupancy: "78%",
        revenue: "$45,890",
    },

}