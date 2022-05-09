import { render, fireEvent } from '@testing-library/react-native';
import ShipList from '../components/ship/ShipList';
import config from "../config/config.json";

let allOrders = [{
    id: 1,
    name: "Björn",
    status: "Packad",
    api_key: config.api_key,
},
{
    id: 2,
    name: "Ulla",
    status: "Packad",
    api_key: config.api_key,
},

{
    id: 3,
    name: "Ulla",
    status: "Ny",
    api_key: config.api_key,
}
]
const setAllOrders = () => false;

const navigation = () => false;
const route = false;

test('Testig authfield for login', async () => {
    const { getByText, getByTestId, getByA11yLabel } = render(<ShipList
                route={route}
                navigation={navigation}
                allOrders={allOrders}
                setAllOrders={setAllOrders}
            />);

    const headerElement = await getByText("Ordrar redo att skickas");
    const a11yLabel = `Tryck för att få fram ${allOrders[0].name}`;
    const titleElement = await getByText("Ulla");

    const submitButton = getByA11yLabel(a11yLabel);

    expect(headerElement).toBeDefined();
    expect(titleElement).toBeDefined();

    expect(submitButton).toBeDefined();




});

const { getByText, debug } = render(<ShipList                 route={route}
                navigation={navigation}
                allOrders={allOrders}
                setAllOrders={setAllOrders} />);

debug("Stocklist component");
