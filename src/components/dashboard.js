import React from 'react';

import Menu from './menu';
import InvoiceList from './invoice/invoice_list';

export default function Dashboard(props) {
    return (
        <div className="row" >
            <div className="column-1-2">
                <Menu />
            </div>
            <div className="column-1-2">
                <InvoiceList />
            </div>
        </div>
    );
}