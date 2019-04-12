import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

import classes from './DataTable.module.css';

const DataTable = props => {

    const [data, setData] = useState([]);
    const [length, setLength] = useState(false);
    const [categoriesLength, setCategoriesLength] = useState(false);

    useEffect(() => {
        const data = [];
        for(let user in props.usersData) {
            const object = {
                ...props.usersData[user],
                ...props.usersData[user].emailConfirmation
            }
            data.push(object)
        }
        setLength(data.length)
        setData(data);
    }, [props.usersData]);

    useEffect(() => {
        const data = [];
        for(let category in props.categoriesData) {
            const object = {
                ...props.categoriesData[category]
            }
            data.push(object);
        }
        setCategoriesLength(data.length)
        setData(data);
    }, [props.categoriesData]);

    const [options] = useState({
        page: 1,  // which page you want to show as default
        sizePerPageList: ((props.userData && props.userData.length < 11) || (props.categoriesData && props.categoriesData.length < 11)) ? [] : [ {
          text: '10', value: 10
        }, {
          text: '15', value: 15
        },
        {
            text: '20', value: 20
        } ], // you can change the dropdown list for size per page
        sizePerPage: 10,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: (start, to, total) => {
            return (
              <p>
                From { start } to { to }, totals is { total }
              </p>
            );
          }, 
        paginationPosition: 'bottom', 
        withFirstAndLast: false
    });

    const buttonFormatter = (cell, row) => {
        const id = row._id;
        return (
            <React.Fragment>
                <Link className="btn btn-warning" to={`/admindashboard/adminViewUser?id=${id}`}>
                    <i className="far fa-eye"></i>
                </Link>
                <Link className="btn btn-primary" to={`/admindashboard/adminEditUser?id=${id}`}>
                    <i className="far fa-edit"></i>
                </Link>
                <button className="btn btn-danger" type="button" 
                    onClick={(e) => props.click(e,id)}>
                       <i className="far fa-trash-alt"></i>
                </button>
            </React.Fragment>
        )
    }

    const categoryButtonFormatter = (cell, row) => {
        const id = row._id;
        return (
            <React.Fragment>
                <Link className="btn btn-warning" to={`/admindashboard/viewcategory?id=${id}`}>
                    <i className="far fa-eye"></i>
                </Link>
                <Link className="btn btn-primary" to={`/admindashboard/editcategory?id=${id}`}>
                    <i className="far fa-edit"></i>
                </Link>
                <button className="btn btn-danger" type="button" 
                    onClick={(e) => props.click(e,id)}>
                       <i className="far fa-trash-alt"></i>
                </button>
            </React.Fragment>
        )
    }

    const subcategoriesFormatter = (cell, row) => row.subcategories.map((sub, index) => `<span class=${classes.SPAN}>${sub.name}</span>`).join('');

    const imgFormatter = (cell, row) => {
        return (
            <React.Fragment>
                <img src={'/' + row.profilePicture} alt={row.name} width="80" height="80" />
            </React.Fragment>
        )
    }

    return (
        <div className={classes.DataTable + " card-body"}>
            {props.usersData && 
            <React.Fragment>
                {(!length || length === 0) ? <SmallSpinner /> :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12'>
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' dataSort>User Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='username' dataSort>User Username</TableHeaderColumn>
                    <TableHeaderColumn dataField='confirmed' dataSort>Account Confirmed</TableHeaderColumn>
                    <TableHeaderColumn dataField='profilePicture' dataFormat={imgFormatter.bind(this)}>User Picture</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                </BootstrapTable>}}
            </React.Fragment>}

            {props.categoriesData && 
            <React.Fragment>
            {props.categoriesData && (!categoriesLength || categoriesLength === 0) ? <SmallSpinner /> :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12'>
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Category Name</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={subcategoriesFormatter}>Subcategories</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={categoryButtonFormatter.bind(this)}>Actions</TableHeaderColumn>
                </BootstrapTable>}
            </React.Fragment>}
        </div>
    );
}

export default DataTable;