$imageVersion = read-host "Enter docker image version"
# Create Dictionary
$envs = @{}
# Map file content to key-value pairs in dictionary
get-content 'react.dev.env' | where { 
	# $name - объявление переменной name
	# $_ - автоматическое имя элемента в итераторе
	$name, $value = $_.split('=')
	
	# Вернуть булевый результат для фильтрации
	# Пропускаем пустое имя и имя, где содержится #
	(![string]::IsNullOrWhiteSpace($name) -and !$name.Contains('#'))
} | foreach {
	# Напечатать в консоль значение переменной
	#write-host $_
	
	$name, $value = $_.split('=')
	
	# Сохранить в словарь пару ключ-значение
	$envs.add($name, $value)
}
# Looping through dictionary keys to substitute env values
# !!! There may be problems if need to substitute variable that need to be substituted
$envKeys = $envs.keys.clone()
foreach ($key in $envKeys) {
	$value = $envs[$key]
	$matches = [regex]::Matches($value, '\$\{([^}]+)\}')
	foreach ($match in $matches) {
		$value = $envs[$key]
		$keyToReplace = $match.groups[1].value
		if ($envs.containsKey($keyToReplace)) {
			$envs[$key] = $value.replace($match.value, $envs[$keyToReplace])
		}
	}
}
# Print dictionary content
$envs.keys | foreach {
	write-host "$($_)=$($envs[$_])"
}
write-host "Image version: $imageVersion"
read-host "Type any key to build & push docker image..."
#write-host "API_BASE_URL: $($envs.API_BASE_URL)"
docker build -t rrain0/kupidon-react-react:$imageVersion --build-arg API_BASE_URL=$envs.API_BASE_URL .
docker push rrain0/kupidon-react-react:$imageVersion
read-host "All operations successful!"