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
    
    // Save list items to localStorage
    useEffect(() => {
        setIsMounted(true);
        const savedItems = localStorage.getItem('items');
        if (savedItems) {
            setItems(JSON.parse(savedItems) as Item[]);
        }
    }, []);

    // Show items in localStorage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('items', JSON.stringify(items));
        }
    }, [items, isMounted]);


    // Add new item to list
    const addItem = (): void => {
        if (newItem.trim() !== '') {
            setItems([...items, { id: Date.now(), text: newItem, bought: false}]);
            setNewItem('');           
        }
        console.log(items);
    };

    // Check off item
    const toggleItemBought = (id: number): void => {
        setItems(
            items.map((item) =>
            item.id === id ? {...item, bought: !item.bought } : item )
        );
    };

    // Edit item text
    const startEditingItem = (id: number, text: string): void => {
        setEditItemId(id);
        setEditedItemText(text);
    };

    // Save item text after edit
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

    // Delete item
    const deleteItem = (id: number): void => {
        setItems(items.filter((item) => item.id !== id));
    };

    if (!isMounted) {
        return null;
    };

return (
    <>
    {/* Add item */}
    <div className="flex mb-7">
        <input
            type='text'
            placeholder='Vare'
            value={newItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value) }
            className="p-2 w-[70vw] rounded-sm border-1 border-black"/>
        <button onClick={addItem} 
        className="ml-2 px-4 bg-primary-2 rounded-sm font-bold text-xl">+</button>
    </div>

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

                        // Not working yet - submit input after hitting enter
                        // onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        //     if (e.key === "Enter") {
                        //         updateItem();
                        //     }
                        // }} 
                        />
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
                        className="p-2 bg-primary-3 text-white mr-1 rounded-sm">Rediger</button>
                    )}
                    {/* Delete item */}
                    <button onClick={() => deleteItem(item.id)} className="p-2 bg-primary-4 text-white rounded-sm">Slett</button>
                </div>
            </div>
        ))}
    </div>

    </>
)
}