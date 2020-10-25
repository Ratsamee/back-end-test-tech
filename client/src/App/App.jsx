import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import GlobalStyle from '../theme';
import axios from 'axios';
import { Application,
    FilterContainer,
    CriteriaContainer,
    Dropdown,
    Text,
    Button,
    SpanText,
    Table,
    TableHeader,
    TableColumn
} from './styles';


const Filter = ({ onSearchClick }) => {
    const [shipTypes, setShipType] = useState(null);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        fetchShipType();
        setFilter({
            shipType: null,
            weightKg: null,
            homePort: null,
            sort: null,
            order: null,
            limit: null,
            skip: null
        })
    }, []);

    const fetchShipType = async () => {
        const initShipType = [{ text: 'Select All', value: ''}];
        const url = 'http://localhost:4000/shiptype';
        const response = await axios.get(url).catch(err => {
            console.log(err);
            setShipType(initShipType);
        });
        
        if (response && response.data && response.data.length > 0) {
            const data = response.data;
            data.map(item => {
                return initShipType.push({
                    text: item,
                    value: item
                });
            });
            setShipType(initShipType);
        }
    };

    const onClick = async (e) => {
        e.preventDefault();
        await onSearchClick(filter);
    }
    return (
        <FilterContainer>
            <CriteriaContainer>
                <SpanText>Ship Type</SpanText>
                {
                    shipTypes 
                    ? <Dropdown onChange={e => setFilter({ ...filter, shipType: e.target.value })}>
                        {
                            shipTypes.map((item, index) => {
                                return <option key={index} value={item.value}>{item.text}</option>
                            })
                        }
                    </Dropdown>
                    : ''
                }
            </CriteriaContainer>
            <CriteriaContainer>
                <SpanText>Weight</SpanText>
                <Text onChange={e => setFilter({ ...filter, weightKg: e.target.value }) } />
            </CriteriaContainer>
            <CriteriaContainer>
                <SpanText>Home port</SpanText>
                <Text onChange={e => setFilter({ ...filter, homePort: e.target.value }) } />
                <Button onClick={async (e) => { await onClick(e); }}>Search</Button>
            </CriteriaContainer>
        </FilterContainer>
    );
};

const TableRow = ({ ships }) => {
    return (
        <>
        {
            ships ? <tbody>
                { ships.map((ship, index) => {
                    return (
                        <tr key={index}>
                            <TableColumn>{ship.ship_type}</TableColumn>
                            <TableColumn>{ship.weight_kg}</TableColumn>
                            <TableColumn>{ship.home_port}</TableColumn>
                            <TableColumn>{ship.ship_name}</TableColumn>
                            <TableColumn>{ship.class}</TableColumn>
                            <TableColumn><Button>Upload Icon</Button></TableColumn>
                        </tr>
                    )
                })}
            </tbody> :
            <tbody>
                <tr>
                    <TableColumn colSpan='6'>No Data</TableColumn>
                </tr>
            </tbody>
        }
        </>
    )
}

const TableDisplayData = ({ ships }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <TableHeader>Ship Type</TableHeader>
                    <TableHeader>Weight</TableHeader>
                    <TableHeader>Home port</TableHeader>
                    <TableHeader>Ship name</TableHeader>
                    <TableHeader>Class</TableHeader>
                    <TableHeader></TableHeader>
                </tr>
            </thead>
            <TableRow ships={ships} />
        </Table>
    );
};

const App = () => {
    const [data, setData] = useState(null);

    const loadData = async (filter) => {
        if (!filter) {
            return;
        }

        const arrParams = [];
        Object.keys(filter).forEach(key => {
            if (filter[key]) {
                const value = (typeof filter[key] === 'string')? encodeURIComponent(filter[key]) : filter[key];
                arrParams.push(`${key}=${value}`);
            }
        });
        const params = arrParams.length > 0 ? `?${ arrParams.join('&') }` : '';
        const url = `http://localhost:4000/ship${params}`;
        console.log(url)
        const response = await axios.get(url).catch(err => {
            console.log(err);
        });

        if (response && response.data && response.data.length > 0) {
            const data = response.data;
            console.log(data)
            setData(data);
        }
    };

    const onSearchClick = async (criteria) => {
        await loadData(criteria);
    };

    return (
        <>
            <Application >
                <Filter onSearchClick={onSearchClick}/>
                <TableDisplayData ships={data} />
            </Application>
            <GlobalStyle />
        </>
    )
};

export default hot(App);