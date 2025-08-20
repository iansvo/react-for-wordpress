import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel, store as editorStore } from '@wordpress/editor';
import { useEntityProp, store as coreStore } from '@wordpress/core-data'
import {useSelect } from '@wordpress/data';
import { TextControl } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

function PluginDocumentSettingPanelDemo() {
  const [meta, setMeta] = useEntityProp('postType', 'page', 'meta' );
  const {authors, isSaving, postId, block } = useSelect( (select) => {
    return {
      authors: select( coreStore ).getUsers({ who: 'authors'}),
      isSaving: select( coreStore ).isSavingEntityRecord(),
      postId: select( editorStore ).getCurrentPostId(),
      block: select( blockEditorStore ).getBlock(),
    }
  }, [] );

  console.log( block );

  return (
    <PluginDocumentSettingPanel
        name="custom-panel"
        title="Custom Panel"
        className="custom-panel"
    >
      <TextControl 
        __nextHasNoMarginBottom
        __next40pxDefaultSize
        label="Bazinga"
        value={ meta?.bazinga }
        type="string"
        onChange={ ( value ) => {
          setMeta( { 
            bazinga: value
          } ) 
        } }
      />
    </PluginDocumentSettingPanel>
  );
};

registerPlugin( 'plugin-document-setting-panel-demo', {
    render: PluginDocumentSettingPanelDemo,
    icon: 'palmtree',
} );
