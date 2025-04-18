'use client'

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface Item {
    id: number;
    text: string;
    bought: boolean;
}

export default function List() {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<string>('');
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [editedItemText, setEditedItemText] = useState<string>('');
    const [shoppingList, setShoppingList] = useState<number>(0);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    
    // useEffect(() => {
    //     setIsMounted(true);
    //     const savedItems = localStorage.getItem('items');
    //     if (savedItems) {
    //         setItems(JSON.parse(savedItems) as Item[]);
    //     }
    // })

    // useEffect(() => {
    //     if (isMounted) {
    //         localStorage.setItem('items', JSON.stringify(items));
    //     }
    // }, [items, isMounted]);

    const addItem = (): void => {
        if (newItem.trim() !== '') {
            setItems([...items, { id: Date.now(), text: newItem, bought: false}]);
            setNewItem('');           
        }
        console.log(items);
    };

    const toggleItemBought = (id: number): void => {
        setItems(
            items.map((item) =>
            item.id === id ? {...item, bought: !item.bought } : item )
        );
    };

    const startEditingItem = (id: number, text: string): void => {
        setEditItemId(id);
        setEditedItemText(text);
    };

    const updateItem = (): void => {
        if (editedItemText.trim() !== '') {
            setItems(
                items.map((item) =>
                item.id === editItemId ? {...item, text: editedItemText} : item)
            );
            setEditItemId(null);
            setEditedItemText('');
        }
    };

    const deleteItem = (id: number): void => {
        setItems(items.filter((item) => item.id !== id));
    };

    // if (!isMounted) {
    //     return null;
    // };

return (
    <>
    {/* Add item */}
    <input
        type='text'
        placeholder='Vare'
        value={newItem}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value) }
        className="p-2 w-[70vw] border-1 border-black"/>
    <button onClick={addItem} 
    className="ml-2 p-2 border-1 border-black">Legg til</button>

    <div className="flex flex-col gap-5 my-2">
        {/* Map all items in list by id*/}
        {items.map((item) => (
            <div 
            key={item.id}>
                <div className="p-1 mb-2 text-xl">
                    {/* Toggle if item is bought */}
                    <input 
                    type="checkbox" 
                    checked={item.bought}
                    onChange={() => toggleItemBought(item.id)}
                    className="mr-2 scale-150" />

                    {/* Edit item text */}
                    {editItemId === item.id ? (
                        <input
                        type="text"
                        value={editedItemText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedItemText(e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") {
                                updateItem();
                            }
                        }} />
                    ) : (
                        <span
                            className={`${item.bought ? 'line-through text-gray-500' : ''}`}>
                                {item.text}
                        </span>
                    )}
                </div>

                <div>
                    {/* Save edited item */}
                    {editItemId === item.id ? (
                        <button onClick={updateItem}> Lagre </button>
                    ) : (
                        <button 
                        onClick={() => startEditingItem(item.id, item.text)} 
                        className="p-2 mr-1 border-1 border-black">Rediger</button>
                    )}
                    {/* Delete item */}
                    <button onClick={() => deleteItem(item.id)} className="p-2 border-1 border-black">Slett</button>
                </div>
            </div>
        ))}
    </div>

    </>
)
}