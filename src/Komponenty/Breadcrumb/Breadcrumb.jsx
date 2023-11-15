import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBreadcrumb } from '../../Kontext/BreadcrumbContext';

const Breadcrumb = (props) => {
  const { product } = props;
  const { addBreadcrumb, breadcrumbs, clearBreadcrumbs } = useBreadcrumb();

  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    console.log('Path Parts:', pathParts);
    clearBreadcrumbs(); 
    let fullPath = '';
    pathParts.forEach((part, index) => {
      fullPath += `/${part}`;
      addBreadcrumb(fullPath);
    });
  }, [location]);

  const handleBreadcrumbClick = (index) => {
    clearBreadcrumbs(index + 1);
  };

  return (
    <div>
      <Link style={{ textDecoration: 'none', color: 'grey'}} to='/'>Domov</Link>
      <span>{' > '}</span>
      {breadcrumbs.map((path, index) => (
        <span key={index}>
          <Link to={path} style={{ textDecoration: 'none', color: 'grey' }}onClick={() => handleBreadcrumbClick(index)}>
            {path.split('/').pop()} {/* Display the last part of the path */}
          </Link>
          {index < breadcrumbs.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
