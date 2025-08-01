import { Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Pokhara",
    image: "/assets/pokhara.jpg",
  },
  {
    name: "Kathmandu",
    image: "/assets/kathmandu.jpg",
  },
  {
    name: "Mount Everest",
    image: "/assets/everest.jpg",
  },
  {
    name: "Lumbini",
    image: "/assets/lumbini.jpg",
  },
  {
    name: "Chitwan",
    image: "/assets/chitwan.jpg",
  },
  {
    name: "Bhaktapur",
    image: "/assets/bhaktapur.jpg",
  },
];

const Homepage = () => {
  const navigate = useNavigate();

  const signupMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate("/signup/tourist")}>
        As Tourist
      </Menu.Item>
      <Menu.Item onClick={() => navigate("/signup/guide")}>As Guide</Menu.Item>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white shadow-sm flex items-center justify-between px-6 py-3">
        <div
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ExploreNepal
        </div>
        <div className="space-x-3">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Dropdown overlay={signupMenu} placement="bottomRight">
            <Button type="primary">Sign Up</Button>
          </Dropdown>
        </div>
      </nav>

      <header className="relative h-[75vh]">
        <img
          src="/assets/hero-nepal.jpg"
          alt="Nepal"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Discover the Beauty of Nepal
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            From mountains to monasteries – your adventure starts here.
          </p>
          <Button
            type="primary"
            size="large"
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/guides")}
          >
            Book a Guide
          </Button>
        </div>
      </header>

      <section className="p-8 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((place) => (
            <div
              key={place.name}
              className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-all"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
