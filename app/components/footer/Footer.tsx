import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import {MdFacebook} from 'react-icons/md';
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaMeta } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
    return ( <footer className="bg-bg text-slate-100 text-sm mt-16">
        <Container>
            <div className="flex flex-row md:flex-col justify-between pt-10 pb-8">
                <FooterList>
                    <h3 className="test-base font-bold mb-2 text-xl">Категорії магазину</h3>
                    <Link href="#">Органічна косметика</Link>
                    <Link href="#">Екологічні продукти для дому</Link>
                    <Link href="#">Повторне використання та вторинна переробка</Link>
                </FooterList>
                <FooterList>
                    <h3 className="test-base font-bold mb-2 text-xl">Служба підтримки</h3>
                    <Link href="#">Часті питання</Link>
                    <Link href="#">Зворотний зв'язок</Link>
                    <Link href="#">Відстеження замовлення</Link>
                    <Link href="#">Обмін та повернення</Link>
                </FooterList>
                <FooterList>
                    <h3 className="test-base font-bold mb-2 text-xl">Про нас</h3>
                    <Link href="#">Наша місія пропагувати екологічний спосіб життя.</Link>
                    <Link href="#">EcoShop © 2024 Всі права захищені.</Link>
                </FooterList>
                <FooterList>
                    <h3 className="test-base font-bold mb-2 text-xl">Слідуй за нами</h3>
                    <div className="flex gap-2">
                        <Link href="#"><CiTwitter size={24}/></Link>
                        <Link href="#"><AiOutlineInstagram size={24}/></Link>
                        <Link href="#"><AiOutlineYoutube size={24}/></Link>
                        <Link href="#"><FaMeta  size={24}/></Link>
                    </div>
                </FooterList>
            </div>
        </Container>
    </footer> );
}
 
export default Footer;