/* External dependencies */
import { Fill } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import PropTypes from "prop-types";

/* Internal dependencies */
import CollapsibleCornerstone from "../../containers/CollapsibleCornerstone";
import SnippetEditor from "../../containers/SnippetEditor";
import Warning from "../../containers/Warning";
import KeywordInput from "../contentAnalysis/KeywordInput";
import ReadabilityAnalysis from "../contentAnalysis/ReadabilityAnalysis";
import SeoAnalysis from "../contentAnalysis/SeoAnalysis";
import MetaboxCollapsible from "../MetaboxCollapsible";
import SidebarItem from "../SidebarItem";
import AdvancedSettings from "../../containers/AdvancedSettings";
import SocialMetadataPortal from "../portals/SocialMetadataPortal";
import SchemaTabContainer from "../../containers/SchemaTab";
import SEMrushRelatedKeyphrases from "../../containers/SEMrushRelatedKeyphrases";

/* eslint-disable complexity */
/**
 * Creates the Metabox component.
 *
 * @param {Object} settings The feature toggles.
 * @param {Object} store    The Redux store.
 * @param {Object} theme    The theme to use.
 *
 * @returns {wp.Element} The Metabox component.
 */
export default function MetaboxFill( { settings } ) {
	return (
		<Fill name="YoastMetabox">
			<SidebarItem
				key="warning"
				renderPriority={ 1 }
			>
				<Warning />
			</SidebarItem>
			{ settings.isKeywordAnalysisActive && <SidebarItem key="keyword-input" renderPriority={ 8 }>
				<KeywordInput
					isSEMrushIntegrationActive={ settings.isSEMrushIntegrationActive }
				/>
				{ ! window.wpseoScriptData.metabox.isPremium && <Fill name="YoastRelatedKeyphrases">
					<SEMrushRelatedKeyphrases />
				</Fill> }
			</SidebarItem> }
			<SidebarItem key="google-preview" renderPriority={ 9 }>
				<MetaboxCollapsible
					id={ "yoast-snippet-editor-metabox" }
					title={ __( "Google preview", "wordpress-seo" ) } initialIsOpen={ true }
				>
					<SnippetEditor hasPaperStyle={ false } />
				</MetaboxCollapsible>
			</SidebarItem>
			{ settings.isContentAnalysisActive && <SidebarItem key="readability-analysis" renderPriority={ 10 }>
				<ReadabilityAnalysis />
			</SidebarItem> }
			{ settings.isKeywordAnalysisActive && <SidebarItem key="seo-analysis" renderPriority={ 20 }>
				<SeoAnalysis
					shouldUpsell={ settings.shouldUpsell }
					shouldUpsellWordFormRecognition={ settings.isWordFormRecognitionActive }
				/>
			</SidebarItem> }
			{ settings.isCornerstoneActive && <SidebarItem key="cornerstone" renderPriority={ 30 }>
				<CollapsibleCornerstone />
			</SidebarItem> }
			{ settings.displayAdvancedTab && <SidebarItem key="advanced" renderPriority={ 40 }>
				<MetaboxCollapsible id={ "collapsible-advanced-settings" } title={ __( "Advanced", "wordpress-seo" ) }>
					<AdvancedSettings />
				</MetaboxCollapsible>
			</SidebarItem> }
			{ settings.displaySchemaSettings && <SidebarItem key="schema" renderPriority={ 50 }>
				<SchemaTabContainer />
			</SidebarItem> }
			<SidebarItem
				key="social"
				renderPriority={ -1 }
			>
				<SocialMetadataPortal target="wpseo-section-social" />
			</SidebarItem>
		</Fill>
	);
}

MetaboxFill.propTypes = {
	settings: PropTypes.object.isRequired,
};
/* eslint-enable complexity */
