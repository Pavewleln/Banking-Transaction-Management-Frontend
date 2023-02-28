import {Disclosure, Menu, Transition} from '@headlessui/react'
import {FC, Fragment, useEffect, useState} from "react";
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {Link, NavLink} from "react-router-dom";
import {LogoutPopup} from "./Popup/LogoutPopup";
import {classNames} from '../utils/classNames';
import {useAppSelector} from "../store";
import {selectAuth} from "../store/auth/auth.slice";
import {BASE_URL} from "../types/baseUrl";
import {useDebounce} from '../hooks/debounce';
import {useSearchCardByFullNameMutation} from "../store/cards/cards.api";

const navigation = [
    {name: 'Главная', href: '/home', current: true},
    // {name: 'Транзакции', href: '/transactions', current: false},
    {name: 'Счета', href: '/accounts', current: false},
    // {name: 'Кредит', href: '/credit', current: false},
    {name: 'Поддержка', href: '/support', current: false},
]

interface HeaderInt {
    authorized: boolean
}

export const Header: FC<HeaderInt> = ({authorized}: HeaderInt) => {
    const [search, setSearch] = useState<string>('')
    const [dropdown, setDropdown] = useState<boolean>(false)
    const auth = useAppSelector(selectAuth())
    let debounced = useDebounce(search)
    const [searchCard, {isLoading, data: cards}] = useSearchCardByFullNameMutation()
    useEffect(() => {
        if (debounced.length > 2) {
            searchCard(search)
        }
    }, [debounced])
    useEffect(() => {
        setDropdown(debounced.length > 3 && cards?.length! > 0)
    }, [debounced, cards])
    const [showModal, setShowModal] = useState(false);

    return authorized ? (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({open}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/*Кнопка мобильного меню*/}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    {/*Навигация 1070px*/}
                                    <div className="hidden sm:ml-3 sm:block">
                                        <div className="flex space-x-2">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={({isActive}) => classNames(
                                                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/*Поиск*/}
                                    <div className="relative mx-2 hidden md:block">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500" aria-hidden="true"
                                                 fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <input type="text" id="search-navbar"
                                               className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="Поиск по имени"
                                               onChange={e => setSearch(e.target.value)}/>
                                    </div>
                                    {/*Дропдаун профиля*/}
                                    <Menu as="div" className="relative ml-3 z-50">
                                        <div>
                                            <Menu.Button
                                                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                {auth?.avatarUrl
                                                    ? <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={`${BASE_URL}${auth?.avatarUrl}`}
                                                        alt=""
                                                    />
                                                    : <label
                                                        className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all">
                                                        <span
                                                            className="font-medium text-gray-600 dark:text-gray-300">{auth?.fullname.split(' ')[0]?.slice(0, 1)}{auth?.fullname.split(' ')[1]?.slice(0, 1)}</span>
                                                    </label>
                                                }
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            to={"/profile"}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Твой профиль
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            to={"/settings"}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Настройки
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <button onClick={() => setShowModal(true)}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 h-full max-h-full w-full flex justify-left')}
                                                        >
                                                            Выйти
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        {/*Мобильное меню*/}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="relative mx-2 md:hidden">
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="text" id="search-navbar"
                                       className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Поиск по имени"
                                       onChange={e => setSearch(e.target.value)}/>
                            </div>
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current ? ' text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <LogoutPopup showModal={showModal} setShowModal={setShowModal}/>
            {dropdown &&
                <ul className="list-none absolute top-15 mx-auto max-h-[200px] right-0 overflow-y-scroll shadow-md bg-white z-10 max-w-[400px] w-full rounded-b-xl">
                    {isLoading && <p className="text-center font-bold text-blue-700">Loading...</p>}
                    {cards?.map((card: any) => (
                        <li className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                            key={card._id}>
                            <p>
                                {card.owner}
                            </p>
                            <p>
                                {card.numberCard}
                            </p>
                        </li>
                    ))}
                </ul>}
        </>
    ) : null
}