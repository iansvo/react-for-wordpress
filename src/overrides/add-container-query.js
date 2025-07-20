import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { escapeAttribute } from '@wordpress/escape-html';

import clsx from 'clsx';

const withContainerQueryControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
      const { name } = props;

      if('core/group' !== name) {
        return <BlockEdit { ...props } />;
      }

      function handleChange( value ) {
        setAttributes({ containerQuery: value });
      }

      const { attributes, setAttributes } = props;
      const { containerQuery } = attributes;

      return (
          <>
              <BlockEdit { ...props } />
              <InspectorControls>
                  <PanelBody>
                    <TextControl 
                      onChange={ handleChange } 
                      value={ containerQuery } 
                      label={ __( 'Container Query', 'react-for-wordpress' ) } 
                    />
                  </PanelBody>
              </InspectorControls>
          </>
      );
    };
}, 'withContainerQueryControl' );

addFilter(
    'editor.BlockEdit',
    'react-for-wordpress/with-container-query-control',
    withContainerQueryControl
);

function addContainerQuery( blockType ) {
  if('core/group' !== blockType.name) {
    return blockType;
  }
  
  blockType.attributes['containerQuery'] = {type: 'string'};
  return blockType;
}

addFilter(
	'blocks.registerBlockType',
	'react-for-wordpress/add-container-query',
	addContainerQuery
);

// Add value to editor output.

const withContainerQueryVariable = createHigherOrderComponent( ( BlockListBlock ) => {
  return ( props ) => {
    const { name, attributes } = props;
    
    if('core/group' !== name) {
      return <BlockListBlock { ...props } />;
    }

    const { containerQuery } = attributes;

    
    const style = containerQuery ? {
      '--container-query': escapeAttribute( containerQuery )
    } : {};

    const wrapperProps = { style, className: clsx( containerQuery && 'has-container-query' ) };
    
    return (
      <BlockListBlock {...props} wrapperProps={wrapperProps} />
    )
  }  
},  'withContainerQueryVariable' );

addFilter(
  'editor.BlockListBlock',
  'react-for-wordpress/with-container-query-variable',
  withContainerQueryVariable
);

// Add value to frontend output.
function outputContainerQueryStyle(props, blockType, attributes) {
  const { containerQuery } = attributes;

  if(!containerQuery || 'core/group' !== blockType.name) {
    return props;
  }

  return {
    ...props,
    className: clsx( props.className, containerQuery && 'has-container-query' ),
    style: containerQuery ? {
      ...props.style,
      '--container-query': escapeAttribute( containerQuery ),
    } : props.style,
  }
}

addFilter(
  'blocks.getSaveContent.extraProps',
  'react-for-wordpress/output-container-query-style',
  outputContainerQueryStyle
)