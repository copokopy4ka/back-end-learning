import { program } from "commander";
import { getAllContacts, getContactById, addContact, updateContact, removeContact } from './contacts.js';

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	let result = null;

  switch (action) {
    case "getAll":
			result = await getAllContacts();
      console.log('allContacts', result);
      break;

    case "getById":
			result = await getContactById(id);
      console.log('contactById', result);
      break;

    case "add":
			result = await addContact(name, email, phone);
      console.log('newContact', result);
      break;

    case "update":
			result = await updateContact(id, name, email, phone);
      console.log('updatedContact', result);
      break;

    case "remove":
			result = await removeContact(id);
      console.log('removedContact', result);
      break;

    default:
      console.warn("Unknown action");
  }

	return result;
}

invokeAction(options);
