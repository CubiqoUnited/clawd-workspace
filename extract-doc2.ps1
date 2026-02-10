$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open((Get-Item 'requirements-doc-2.docx').FullName)
$text = $doc.Content.Text
$doc.Close()
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
$text | Out-File -FilePath 'requirements-doc-2.txt' -Encoding UTF8
