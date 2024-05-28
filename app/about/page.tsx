import Heading from "../components/products/Heading";

const About = () => {
    return ( <div className="text-green w-full items-center text-center p-3 px-16">
        <Heading title="Ласкаво просимо до нашого еко-магазину!"/>
        <Heading title="Хто ми?"/>
        <p className="py-3">Ми - ваше надійне джерело екологічно чистих товарів,
            що сприяють збереженню навколишнього середовища. 
            У нас ви знайдете широкий вибір товарів, 
            від харчових еко-продуктів до високоякісних 
            екологічних побутових товарів.</p>
        <img src="https://letsdoitukraine.org/wp-content/uploads/2022/11/IMG_1500.jpg" alt="about1"/>
            <p className="py-3">
            Ми - команда ентузіастів з екології, які пропагують стиль життя, спрямований на збереження навколишнього середовища. Наша місія полягає в тому, щоб зробити екологічні товари доступними для всіх, допомагаючи зменшити наш екологічний слід.
            </p>
            <div className="flex">
                <div className="w-full items-center h-full text-center">
                    <img src="https://st4.depositphotos.com/12985790/19951/i/450/depositphotos_199510384-stock-photo-young-female-volunteers-recycling-box.jpg" alt="about2"/>
                </div>
                <div className=" ml-5">
                    <h1 className="text-xl font-bold my-3 text-start">Наші цінності</h1>
                    <h2 className="text-start">У нашій роботі ми керуємося декількома ключовими цінностями:</h2>
                        <li className="text-start"><span className="font-bold">Свідомість:</span> Ми прагнемо підвищувати усвідомленість про екологічні проблеми та пропонувати практичні рішення.</li>
                        <li className="text-start"><span className="font-bold">Якість:</span>Ми обираємо тільки найкращі екологічні товари, які відповідають нашим стандартам якості та етики.</li>
                        <li className="text-start"><span className="font-bold">Транспарентність:</span> Ми прагнемо забезпечувати чесну та відкриту інформацію про наші дії та внесок у справу збереження природи.</li>
                    
                </div>
            </div>

    </div> );
}
 
export default About;