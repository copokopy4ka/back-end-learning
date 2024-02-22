import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = join(__dirname, 'src/db/contacts.json');

export const getAllContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
	return JSON.parse(contactsList);
}

export const getContactById = async (contactId) => {
	const contactsList = await getAllContacts();
	const itemIndex = contactsList.findIndex(el => el.id === contactId);
	
	if (itemIndex === -1) {
		return null;
	}

	return contactsList[itemIndex];
}

export const addContact = async (name, email, phone) => {
	 const contactsList = await getAllContacts();
	 const newContact = {
		id: nanoid(),
		name,
		email,
		phone
	 };

	 contactsList.push(newContact);
	 await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
	 return newContact;
}
export const updateContact = async (id, name, email, phone) => {
	 const contactsList = await getAllContacts();
	 const contactIndex = contactsList.findIndex(el => el.id === id);

	 if (contactIndex === -1) {
		return null;
	 }

	 const updated = {
		id,
		name: name || contactsList[contactIndex].name,
		email: email || contactsList[contactIndex].email,
		phone: phone || contactsList[contactIndex].phone,
	 }
	 contactsList.splice(contactIndex, 1, updated);
	 await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
	 return updated;
}


export const removeContact = async (contactId) => {
  const contactsList = await getAllContacts();
	const itemIndex = contactsList.findIndex(el => el.id === contactId);
	
	if (itemIndex === -1) {
		return null;
	}

	const [removedItem] = contactsList.splice(itemIndex, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
	return removedItem;
}
