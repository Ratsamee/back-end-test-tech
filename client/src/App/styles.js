import styled from 'styled-components';

export const Application = styled.div`
    font-family: Roboto;
    font-weight: 500;
    font-size: 15px;
    font-style: normal;
    background-color: white; 
    color: black;
    border: 1px solid gray;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 10px;
    width: ${window.innerWidth * 0.7}px;
    height: ${window.innerHeight * 0.9}px;
    overflow-y: auto;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

export const CriteriaContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    align-items: center;
`;

export const Dropdown = styled.select`
    width: 150px;
    height: 30px;
`;

export const SpanText = styled.span`
    width: 100px;
    color: black;
`;

export const Text = styled.input`
    width: 200px;
    height: 20px;
`;

export const Button = styled.button`
    width: 100px;
    height: 30px;
    background-color: #606060;
    border-radius: 5px;
    color: white;
    border: 1px solid #A0A0A0;
    margin-left: 10px;
`;

export const Table = styled.table`
    margin-top: 20px;
    width: 100%;
    // border: 1px solid black;
    border-spacing: 0px;
    height: 400px;
`;

export const TableHeader = styled.th`
    width: 16%;
    height: 30px;
    border: 1px solid gray;
    background-color: #E0E0E0;
`;

export const TableColumn = styled.td`
    font-weight: 300;
    font-size: 15px;
    width: 16%;
    height: 30px;
    border: 1px solid gray;
    text-align: center;
`;