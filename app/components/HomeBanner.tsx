const HomeBanner = () => {
    return ( 
    <div className="relative bg-gradient-to-r from-green-600 to-green-300 mb-8">
        <div className="mx-auto px-8 py-12 flex flex-col gab-2 md:flex-row items-center justify-evenly">
            <div className="mb-8 md:mb-0 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Літні знизки</h1>
                <p className="text-lg md:text-xl text-white mb-2 ">З 01.06.2024 по 01.07.2024</p>
                <p className="text-2xl md:text-5xl text-yellow-300 font-bold">ДО 75%</p>
            </div>
            <div className="w-1/3 relative aspect-video">
                <img src="/banner-image.png" alt="Banner Image" className="object-contain"/>
            </div>
        </div>
    </div> );
}
 
export default HomeBanner;