const ThreeDynamics = () => {
  return (
    <section className="w-full text-gray-200 px-3 flex flex-col justify-center items-center">
      <div className="w-full py-6 flex justify-center items-center">
        <h6 className="font-light text-2xl text-base-content">
          A Small Hackathon Project By
        </h6>
      </div>

      <div className="w-[100%] md:w-[80%] lg:w-[80%] flex  justify-center items-center gap-x-[1rem] py-6">
        {[
          {
            src: "/lalit.PNG",
            name: "Lalit Lamba",
            desc: "Master's In Computer Science",
          },
    
          {
            src: "/yash.png",
            name: "Yash Wardhan",
            desc: "B-TECH Computer Science",
          },
          {
            src: "/nik.png",
            name: "Nikhil Koshal",
            desc: "Master's In Computer Science",
          },
          {
            src: "/paji.PNG",
            name: "Jagdeep Goraya",
            desc: "Master's In Computer Science",
          },
        ].map((person, i) => (
          <div
            key={i}
            className="w-[25%] hover:w-[58%] cursor-pointer transition-all delay-100 duration-500 ease-in-out rounded-2xl h-[35rem] bg-blue-100 overflow-hidden relative"
          >
            <img
              src={person.src}
              alt={person.name}
              className="object-cover h-full w-full"
            />

            {/* Gradient overlay */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent z-0" />

            {/* Text */}
            <div className="absolute bottom-0 w-full flex justify-center items-center flex-col py-6 z-10">
              <h3 className="font-bold text-2xl text-white text-center">
                {person.name}
              </h3>
              <p className="text-gray-300 text-[0.7rem]">{person.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeDynamics;
