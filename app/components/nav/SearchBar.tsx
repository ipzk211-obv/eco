"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { MdOutlineClear } from "react-icons/md";

const SearchBar = () => {
    const router = useRouter();
    const [searchTermDisplay, setSearchTermDisplay] = useState<string>("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push("/catalog");
        const url = queryString.stringifyUrl({
            url: "/catalog",
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true });
        router.push(url);
        setSearchTermDisplay(data.searchTerm); 
    };

    const handleClearSearch = () => {
        setSearchTermDisplay("");
        reset();
        router.push("/catalog");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div className="items-center w-full bg-bg">
            <div className="flex items-center mx-auto text-center w-full relative">
            <input
                {...register("searchTerm")}
                type="text"
                placeholder="Пошук.."
                autoComplete="off"
                className="p-4 pl-10 border-0 bg-bg rounded-md focus:outline-none focus:border-0  focus:bg-slate-100 focus:border-slate-100 focus:text-white transition-all duration-300 ease-in-out w-full"
                onKeyDown={handleKeyDown}
            />
                <ImSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                {searchTermDisplay ? (
                    <div>
                        <button onClick={handleClearSearch} className="flex items-center absolute right-4 top-4 text-gray-400 hover:text-slate-50 focus:outline-none">
                            <p className="mr-1">Очистити пошук</p>
                            <MdOutlineClear className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                  <div></div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
