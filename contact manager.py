# include <stdio.h>
# include <stdlib.h>
# include <string.h>
# define MAX_CONTACTS 100
// Structure
to
hold
contact
details
typedef
struct
{
    char
name[50];
char
email[50];
char
phone[20];
} Contact;
// Function
prototypes
void
createContact(Contact[], int *);
void
searchContact(Contact[], int);
void
deleteContact(Contact[], int *);
void
displayContacts(Contact[], int);
int
main()
{
    Contact
contacts[MAX_CONTACTS]; // Array
of
contacts
int
numContacts = 0; // Number
of
contacts in the
array
int
choice;
do
{
// Display
menu
printf("\n--- Contact Manager ---\n");
printf("1. Create a contact\n");
printf("2. Search for a contact\n");
printf("3. Delete a contact\n");
printf("4. Display all contacts\n");
printf("0. Exit\n");
printf("Enter your choice: ");
scanf("%d", & choice);
// Perform
action
based
on
user
choice
switch(choice)
{
    case
1:
createContact(contacts, & numContacts);
break;
case
2:
searchContact(contacts, numContacts);
break;
case
3:
deleteContact(contacts, & numContacts);
break;
case
4:
displayContacts(contacts, numContacts);
break;
case
0:
printf("Exiting...\n");
break;
default:
printf("Invalid choice. Try again.\n");
break;}
} while (choice != 0);
return 0;
}
// Function
to
create
a
new
contact
void
createContact(Contact
contacts[], int * numContacts) {
// Check if maximum
number
of
contacts
have
been
reached
if (*numContacts >= MAX_CONTACTS) {
printf("Maximum number of contacts reached.\n");
return;
}
// Get
contact
details
from user
    Contact

newContact;
printf("Enter name: ");
scanf("%s", newContact.name);
printf("Enter email: ");
scanf("%s", newContact.email);
printf("Enter phone number: ");
scanf("%s", newContact.phone);
// Add
contact
to
array
contacts[*numContacts] = newContact;
(*numContacts) + +;
printf("Contact added successfully.\n");
}
// Function
to
search
for a contact by name
void searchContact(Contact contacts[], int numContacts) {
char name[50];
printf("Enter name to search for: ");
scanf("%s", name);
int found = 0;
for (int i = 0; i < numContacts; i++) {
if (strcmp(contacts[i].name, name) == 0) {
printf("Name: %s\nEmail: %s\nPhone: %s\n", contacts[i].name, contacts[i].email,
contacts[i].phone);
found = 1;
break;
}
}
if (!found) {
printf("Contact not found.\n");
}
}
// Function to delete a contact by name
void deleteContact(Contact contacts[], int * numContacts) {
char name[50];
printf("Enter name to delete: ");
scanf("%s", name);
int found = 0;
for (int i = 0; i < * numContacts; i++) {
if (strcmp(contacts[i].name, name) == 0) {
// Shift
all
contacts
after
the
deleted
contact
to
the
left
for (int j = i; j < * numContacts - 1; j++) {
    contacts[j] = contacts[j+1];
}
(*numContacts) - -;
printf("Contact deleted successfully.\n");
found = 1;
break;
}
}
if (!found) {
printf("Contact not found.\n");
}
}
// Function to display all contacts
void displayContacts(Contact contacts[], int numContacts) {
if (numContacts == 0) {
printf("No contacts found.\n");
return;
}
printf("All contacts:\n");
for (int i = 0; i < numContacts; i++)
{
printf("Name: %s\nEmail: %s\nPhone: %s\n", contacts[i].name, contacts[i].email,
       contacts[i].phone);
}
}
