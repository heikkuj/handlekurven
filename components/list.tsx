'use client'

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface Item {
    id: number;
    text: string;
    completed: boolean;
}

export default function List() {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<string>('');
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [editedItemText, setEditedItemText] = useState<string>('');
    const [isMounted, setIsMounted] = useState<boolean>(false);
    
    useEffect(() => {
        setIsMounted(true);
        const savedItems = localStorage.getItem('items');
        if (savedItems) {
            setItems(JSON.parse(savedItems) as Item[]);
        }
    })

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('items', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (): void => {
        if (newItem.trim() !== '') {
            setItems([...items, { id: Date.now(), text: newItem, completed: false}]);
            setNewItem('');
        }
    };

    const toggleItemBought = (id: number): void => {
        setItems(
            items.map((item) =>
            item.id === id ? {...item, completed: !item.completed } : item )
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

    if (!isMounted) {
        return null;
    };

return (
    <p>Abc</p>
)
}