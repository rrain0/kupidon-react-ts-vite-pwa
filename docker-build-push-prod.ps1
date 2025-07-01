$imageVersion = read-host "Enter docker image version"
# Create Dictionary
$envs = @{}
# Map file content to key-value pairs in dictionary
get-content 'react.prod.env' | where {
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
read-host "Press any key to build & push docker image..."
#write-host "BACKEND_HOST: $($envs.BACKEND_HOST)"
#write-host "BACKEND_PORT: $($envs.BACKEND_PORT)"
$backendHost = $envs.BACKEND_HOST
$backendPort = $envs.BACKEND_PORT
docker build -t rrain0/kupidon-react-react:$imageVersion --build-arg BACKEND_HOST=$backendHost --build-arg BACKEND_PORT=$backendPort .
docker push rrain0/kupidon-react-react:$imageVersion
read-host "All operations FINISHED!"