import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class InvoiceList extends Component {
    renderItem(invoice) {
        return (
            <tr key={invoice._id}>
                <td><a href={invoice.url } target="_blank" >{invoice.title}</a></td>
                <td>{this.getRecipientName(invoice.recipient)}</td>
                <td>{invoice.total}.00€</td>
            </tr>
        );
    }

    getRecipientName(r) {
        return this.props.contacts
            ? this.props.contacts.reduce( (a, c) => c._id == r ? c.name : "", "" )
            : "";
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope="col">Laskun otsikko</th>
                        <th scope="col">Vastaanottaja</th>
                        <th scope="col">Summa</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.invoices.map(this.renderItem.bind(this))}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => ({ invoices: state.invoices, contacts: state.user.contacts });

export default connect(mapStateToProps)(InvoiceList);