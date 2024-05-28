import Container from "../components/Container";
import Heading from "../components/products/Heading";

const Charity = () => {
    return ( 
    <Container>
        <div className="flex flex-col text-green">
            <div className="w-full items-center text-center">
                <Heading title="Збереження Природи Крок за Кроком: Посадіть Дерево з Кожною Покупкою!"/>
            </div>
            <div className="flex justify-between mt-5">
                <div className="flex-1 mr-5 text-xl">
                    <p>Звільнюючи відповідальність за наше спільне майбутнє, ми прагнемо створити ініціативу, яка не лише допоможе вам здійснити свої покупки, а й зробить планету краще для наступних поколінь. І так, ми раді представити вам нашу програму «Зелений слід».</p>
                    <p className="mt-5">У рамках цієї програми ми відводимо 25% від усіх здійснених вами покупок на посадку нових дерев. Це означає, що кожна ваша покупка стає актом доброчинності, який сприяє збереженню природи та створенню нових лісів.</p>
                </div>
                <div className="flex-3"><img src="https://st3.depositphotos.com/12039320/16234/i/380/depositphotos_162343640-stock-photo-hands-holding-young-plant-with.jpg" alt="photo" /></div>
            </div>
            <div>
                <p className="mt-5 text-xl items-center text-center">Ми віримо, що кожен крок у напрямку еко-свідомого споживання має велике значення. Тому кожна покупка у нашому інтернет-магазині не лише приносить вам задоволення від якісних продуктів, але й стає вашим внеском у збереження нашої планети.</p>
            </div>
            <div className="flex justify-between mt-5">
                <div className="flex-3"><img src="https://static4.depositphotos.com/1006708/320/i/380/depositphotos_3205209-stock-photo-environmental-activist-in-the-forest.jpg" alt="photo" /></div>
                <div className="flex-1 ml-5 text-xl">
                    <p>Допомагаючи нам, ви допомагаєте природі. Кожен раз, коли ви вибираєте еко-продукт в нашому магазині, ви активно допомагаєте зменшити вуглецевий слід та створюєте більше можливостей для природи відновлюватися.</p>
                    <p className="mt-5">Приєднуйтеся до нас в цьому захоплюючому шляху збереження планети! Купуйте еко-продукти у нашому магазині та долучайтеся до нашої програми «Зелений слід», де кожен ваш вибір робить світ краще для нас і майбутніх поколінь.</p>
                </div>
            </div>
        </div>
    </Container>);
}
 
export default Charity;