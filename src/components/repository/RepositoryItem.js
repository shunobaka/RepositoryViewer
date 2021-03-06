/**
 * @fileoverview Defines a RepositoryItem react component that renders a
 *    an accordion card with information repository.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';

/**
 * RepositoryItem react component that renders repository information.
 * @param {object} props Contains the the repository and its index in the
 *    list of repositories
 */
const RepositoryItem = ({ repository, index }) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={repository.id}>
        {`${index + 1}.`.padEnd(4)} {repository.name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={repository.id}>
        <Card.Body>
          <a href={repository.url}>Go to repository</a>
          <br />
          <br />
          <h5>Description:</h5>
          {repository.description ? (
            <span>{repository.description}</span>
          ) : (
            <span className="text-warning">
              This repository does not have a description
            </span>
          )}
          <br />
          <br />
          <h5>Created on:</h5>
          <span>{new Date(repository.created_at).toLocaleDateString()}</span>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

export default RepositoryItem;
