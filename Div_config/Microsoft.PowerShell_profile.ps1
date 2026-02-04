function prompt {
    $currentFolder = Split-Path -Leaf (Get-Location)
    return "$($PSStyle.Foreground.Cyan)[$currentFolder]$($PSStyle.Reset) " + $(if ($nestedPromptLevel -ge 2) { '>> ' } else { '> ' })
}


# Define the path for storing favorite locations (in windows)
$FavoriteLocationsFile = "$HOME\Documents\PowerShell\favorites.json"

# Ensure the storage file exists
if (!(Test-Path $FavoriteLocationsFile)) {
  @{} | ConvertTo-Json | Set-Content $FavoriteLocationsFile
}

# Function to add a directory alias
function Add-LocationAlias {
  param(
      [string]$Alias,
      [string]$Path = (Get-Location).Path
      )

# Load existing aliases
    $locations = Get-Content $FavoriteLocationsFile | ConvertFrom-Json

# Add new alias
    $locations | Add-Member -MemberType NoteProperty -Name $Alias -Value $Path -Force

# Save back to file
    $locations | ConvertTo-Json | Set-Content $FavoriteLocationsFile
    Write-Host "Saved '$Alias' -> '$Path'"
}

# Function to jump to a saved alias
function Jump-To {
  param(
      [string]$Alias
      )

# Load aliases
    $locations = Get-Content $FavoriteLocationsFile | ConvertFrom-Json

    if ($locations.PSObject.Properties[$Alias]) {
      Set-Location $locations.$Alias
    } else {
      Write-Host "Alias '$Alias' not found!" -ForegroundColor Red
    }
}

# Function to list saved locations
function List-LocationAliases {
  $locations = Get-Content $FavoriteLocationsFile | ConvertFrom-Json
    $locations.PSObject.Properties | ForEach-Object {
      Write-Host "$($_.Name) -> $($_.Value)"
    }
}

# Function to provide tab completion for Jump-To aliases
function Complete-LocationAlias {
  param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameters)

    $locations = Get-Content $FavoriteLocationsFile | ConvertFrom-Json

# Filter and return matching aliases
    $locations.PSObject.Properties.Name -match "^$wordToComplete" | ForEach-Object {
      [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
    }
}

# Register autocompletion for Jump-To function
Register-ArgumentCompleter -CommandName Jump-To -ParameterName Alias -ScriptBlock ${function:Complete-LocationAlias}

function List-DirectoriesRecursive {
    param(
        [int]$Depth = 1,
        [switch]$Files
    )
    $Depth--

    $params = @{
        Recurse = $true
        Name    = $true
        Depth   = $Depth
    }

    if ($Files) { $params.File = $true } else { $params.Directory = $true }
    Get-ChildItem @params
}

Set-Alias whereami Get-Location
Set-Alias jt Jump-To
Set-Alias touch New-Item
Set-Alias dirs List-DirectoriesRecursive
Set-Alias alias-jt Add-LocationAlias

# Green text, removes annoying background in dir command
$PSStyle.FileInfo.Directory = ''
$PSStyle.FileInfo.Directory = $PSStyle.Foreground.Green

# Makes the complete menu usable in alacritty
Set-PSReadLineKeyHandler -Key F4 -Function MenuComplete
