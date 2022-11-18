# Development

### Link to Deployed Website
`https://intrepidpanda123.github.io/react-development`

### Goal and Value of the Application
This application allows a user to add and remove items from their cart while browsing a bakery page.
It has value to the user since it allows them to view items in multiple different ways through
sorting and filtering options. It also sums up the price of the items in the cart to help the user
track how much they are spending.

### Usability Principles Considered
The user likely wants to always be able to see their cart to inform what else they need to add. That
is why the sidebar on the left is floating, so that the cart is always visible independent of the
scrolling on the bakery items.

I also include the relevant info for each bakery item in the cart on its own line to help users find
important information easily and quickly.

Button functionality is clearly labeled so users know how to add and remove from their cart.

Radio buttons tell the user that they can only sort by one property at a time, while multiple
filters can be applied at the same time, which is afforded by checkboxes.

### Organization of Components
I created a `BakeryItem` component to handle creating each of the cards for the bakery items, since
they are similarly styled. Multiple `BakeryItems` are rendered through a `map` call on the
`bakeryItems` variable, which is a state variable that tracks the displayed bakery items.

### How Data is Passed Down Through Components
The `BakeryItem` component needs the data for each item, which is passed to it through the `item`
prop. It also needs a way to update the state of the app in order to add to the cart; this is passed
through the `callback` prop.

### How the User Triggers State Changes
There is an `onChangeValue` function for each of the interactive filter/sorting options, which
causes a state change and a recalculation of which bakery items to display and in which order to
display them. In addition, clicking the `Add to Cart` and `Remove 1x from Cart` buttons triggers a
state change in the cart and also triggers a recalculation of the cost of the cart, which cause the
UI to update accordingly.

The `Reset page` button returns the state variables to their original values.
