let issue = (hashNumber) =>
	`<a href="https://github.com/itsmartashub/DeepStyled/issues/${hashNumber}" target="_blank" rel="noopener noreferrer" class="changelog__seefullchangelog">#${hashNumber}</a>`

const RELEASE_CHANGES = `

<h3>🛠️ Improvements</h3>

<ul>
	<li><strong>Search & Maps UI: </strong>Enhanced location markers, review cards, and counter bubbles to match accent theme ${issue(
		99
	)}</li>
	<li><strong>Voice Button: </strong>Restored styles after OpenAI updates ${issue(98)}</li>
	<li><strong>Sidebar Chat List: </strong>Enhanced selected chat appearance and hover interactions ${issue(100)}</li>
	<li><strong>New Customize ChatGPT: </strong>Support the styles for the latest <code>Customize ChatGPT</code> (Instructions)</li>
	<li><strong>Copy code and Edit Buttons: </strong>Refine code snippet button styling</li>
	<li><strong>Temporary Prompt Field: </strong>Added distinct background for <code>Temporary</code> conversations ${issue(
		98
	)}</li>
</ul>
`

export { RELEASE_CHANGES }
